import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useAnimate,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  Apple,
  Book,
  Car,
  Cat,
  Check,
  ChevronDown,
  CupSoda,
  Dog,
  Fish,
  Flower2,
  House,
  Moon,
  Plane,
  RotateCcw,
  Star,
  Sun,
  TreePine,
  TriangleAlert,
  Umbrella,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/useMobile";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useSimulation } from "@/contexts/SimulationContext";
import CitationRef from "./CitationRef";

/* ============================================================
   模块5 快速命名 · RapidNaming
   名称提取流水线 · 进入视口后自动播放 · 不计分 / 不筛查 / 不诊断
   - 两种模式共用相同输入节奏，由处理时长差异产生或避免排队
   - 每个图标是具有独立 instanceId 和生命周期的 BeltItem
   - 可取消 producer / consumer：runId + 真正 clearTimeout + controls.stop
   - reduced motion 下保留完整状态与队列差异，只移除连续位移和抖动
   ============================================================ */

const SERIF = "'Noto Serif SC', serif";
const SANS = "'Noto Sans SC', sans-serif";
const GROTESK = "'Space Grotesk', sans-serif";

const FLOW_DIRECTION = "left-to-right" as const;
const BELT_PATTERN_PX = 24;
const FEED_MS = 1100;
const ENTER_MS = 1500;
const ENTER_SETTLE_MS = 1550;
const CHECKPOINT_TRANSFER_MS = 100;
const CHECKPOINT_MOVE_MS = 80;
const FLUENT_PROCESS_MS = 320;
const EFFORTFUL_PROCESS_MS = [2400, 3000, 2100, 2800, 2500] as const;
const BELT_PAIRED_HOLD_MS = 180;
const LEAVE_MS = 220;
const LEAVE_SETTLE_MS = 260;
const BACKPRESSURE_POLL_MS = 180;
const BELT_STRIPE_DURATION = 2.8;
const FADE_MS = 150;
const PAIR_TRANSITION_MS = 120;

interface NamingItem {
  id: string;
  label: string;
  pinyin: string;
  Icon: LucideIcon;
}

const ITEMS: NamingItem[] = [
  { id: "cat", label: "猫", pinyin: "māo", Icon: Cat },
  { id: "book", label: "书", pinyin: "shū", Icon: Book },
  { id: "tree", label: "树", pinyin: "shù", Icon: TreePine },
  { id: "sun", label: "太阳", pinyin: "tài yáng", Icon: Sun },
  { id: "cup", label: "杯子", pinyin: "bēi zi", Icon: CupSoda },
  { id: "apple", label: "苹果", pinyin: "píng guǒ", Icon: Apple },
  { id: "car", label: "汽车", pinyin: "qì chē", Icon: Car },
  { id: "fish", label: "鱼", pinyin: "yú", Icon: Fish },
  { id: "flower", label: "花", pinyin: "huā", Icon: Flower2 },
  { id: "house", label: "房子", pinyin: "fáng zi", Icon: House },
  { id: "moon", label: "月亮", pinyin: "yuè liang", Icon: Moon },
  { id: "plane", label: "飞机", pinyin: "fēi jī", Icon: Plane },
  { id: "star", label: "星星", pinyin: "xīng xing", Icon: Star },
  { id: "umbrella", label: "雨伞", pinyin: "yǔ sǎn", Icon: Umbrella },
  { id: "dog", label: "小狗", pinyin: "xiǎo gǒu", Icon: Dog },
];

type FlowMode = "fluent" | "effortful";
type FlowStatus = "idle" | "running";
type BeltItemState =
  | "entering"
  | "waiting"
  | "processing"
  | "paired"
  | "leaving";

interface BeltItem {
  instanceId: number;
  runId: number;
  sequenceIndex: number;
  itemIndex: number;
  state: BeltItemState;
}

interface FlowState {
  runId: number;
  runMode: FlowMode;
  status: FlowStatus;
  incomingItems: BeltItem[];
  waitingQueue: BeltItem[];
  processingItem: BeltItem | null;
  pairedItem: BeltItem | null;
  displayPairItem: BeltItem | null;
  leavingItems: BeltItem[];
  warningInstanceId: number | null;
  releasedCount: number;
  completedCount: number;
}

type FlowAction =
  | { type: "reset"; runId: number; mode: FlowMode }
  | { type: "release"; runId: number; item: BeltItem }
  | { type: "arrive"; runId: number; instanceId: number }
  | { type: "take-next"; runId: number }
  | { type: "begin-processing"; runId: number; instanceId: number }
  | { type: "show-warning"; runId: number; instanceId: number }
  | { type: "pair"; runId: number; instanceId: number }
  | { type: "start-leave"; runId: number; instanceId: number }
  | { type: "finish-leave"; runId: number; instanceId: number };

interface RunTimer {
  id: number;
  settle: (elapsed: boolean) => void;
}

interface MotionControl {
  stop: () => void;
}

interface RunContext {
  id: number;
  mode: FlowMode;
  cancelled: boolean;
  consumerRunning: boolean;
  timers: Map<number, RunTimer>;
  controls: Set<MotionControl>;
}

const MODE_OPTIONS: Array<{ value: FlowMode; label: string }> = [
  { value: "fluent", label: "提取流畅" },
  { value: "effortful", label: "提取困难" },
];

function createFlowState(
  runId = 0,
  runMode: FlowMode = "fluent",
  status: FlowStatus = "idle"
): FlowState {
  return {
    runId,
    runMode,
    status,
    incomingItems: [],
    waitingQueue: [],
    processingItem: null,
    pairedItem: null,
    displayPairItem: null,
    leavingItems: [],
    warningInstanceId: null,
    releasedCount: 0,
    completedCount: 0,
  };
}

function canTakeNext(state: FlowState) {
  const nextWaitingItem = state.waitingQueue[0];
  return Boolean(
    !state.processingItem &&
      !state.pairedItem &&
      nextWaitingItem &&
      !state.incomingItems.some(
        item => item.sequenceIndex < nextWaitingItem.sequenceIndex
      )
  );
}

function flowReducer(state: FlowState, action: FlowAction): FlowState {
  if (action.type === "reset") {
    return action.runId > state.runId
      ? createFlowState(action.runId, action.mode, "running")
      : state;
  }
  if (action.runId !== state.runId) return state;

  switch (action.type) {
    case "release":
      if (
        state.incomingItems.some(
          item => item.instanceId === action.item.instanceId
        )
      ) {
        return state;
      }
      return {
        ...state,
        incomingItems: [...state.incomingItems, action.item],
        releasedCount: state.releasedCount + 1,
      };

    case "arrive": {
      const arrived = state.incomingItems.find(
        item => item.instanceId === action.instanceId
      );
      if (!arrived) return state;
      const waitingItem: BeltItem = { ...arrived, state: "waiting" };
      return {
        ...state,
        incomingItems: state.incomingItems.filter(
          item => item.instanceId !== action.instanceId
        ),
        waitingQueue: [...state.waitingQueue, waitingItem].sort(
          (a, b) => a.sequenceIndex - b.sequenceIndex
        ),
      };
    }

    case "take-next": {
      if (!canTakeNext(state)) return state;
      const [next, ...rest] = state.waitingQueue;
      return {
        ...state,
        waitingQueue: rest,
        processingItem: { ...next, state: "entering" },
      };
    }

    case "begin-processing":
      if (
        state.processingItem?.instanceId !== action.instanceId ||
        state.processingItem.state !== "entering"
      ) {
        return state;
      }
      return {
        ...state,
        processingItem: { ...state.processingItem, state: "processing" },
      };

    case "show-warning":
      if (
        state.processingItem?.instanceId !== action.instanceId ||
        state.processingItem.state !== "processing" ||
        state.warningInstanceId === action.instanceId
      ) {
        return state;
      }
      return { ...state, warningInstanceId: action.instanceId };

    case "pair":
      if (
        state.processingItem?.instanceId !== action.instanceId ||
        state.processingItem.state !== "processing"
      ) {
        return state;
      }
      return {
        ...state,
        processingItem: null,
        pairedItem: { ...state.processingItem, state: "paired" },
        displayPairItem: { ...state.processingItem, state: "paired" },
        warningInstanceId: null,
      };

    case "start-leave":
      if (state.pairedItem?.instanceId !== action.instanceId) return state;
      return {
        ...state,
        pairedItem: null,
        leavingItems: [
          ...state.leavingItems,
          { ...state.pairedItem, state: "leaving" },
        ],
      };

    case "finish-leave": {
      const leavingItem = state.leavingItems.find(
        item => item.instanceId === action.instanceId
      );
      if (!leavingItem) return state;
      return {
        ...state,
        leavingItems: state.leavingItems.filter(
          item => item.instanceId !== action.instanceId
        ),
        completedCount: state.completedCount + 1,
      };
    }
  }
}

function getProcessMs(mode: FlowMode, sequenceIndex: number) {
  return mode === "fluent"
    ? FLUENT_PROCESS_MS
    : EFFORTFUL_PROCESS_MS[sequenceIndex % EFFORTFUL_PROCESS_MS.length];
}

function isLongStall(mode: FlowMode, sequenceIndex: number) {
  return mode === "effortful" && getProcessMs(mode, sequenceIndex) > FEED_MS;
}

function sleepForRun(context: RunContext, ms: number) {
  if (context.cancelled) return Promise.resolve(false);

  return new Promise<boolean>(resolve => {
    let settled = false;
    let id = 0;

    const settle = (elapsed: boolean) => {
      if (settled) return;
      settled = true;
      context.timers.delete(id);
      resolve(elapsed);
    };

    id = window.setTimeout(() => settle(true), ms);
    context.timers.set(id, { id, settle });

    if (context.cancelled) {
      window.clearTimeout(id);
      settle(false);
    }
  });
}

function trackControl<T extends MotionControl>(
  context: RunContext,
  control: T
) {
  context.controls.add(control);
  void Promise.resolve(control).then(
    () => context.controls.delete(control),
    () => context.controls.delete(control)
  );
  return control;
}

function ModeControl({
  mode,
  onChange,
  locked,
}: {
  mode: FlowMode;
  onChange: (mode: FlowMode) => void;
  locked: boolean;
}) {
  return (
    <div className="space-y-1.5">
    <div
      className="grid w-full grid-cols-2 gap-1 rounded-md border border-border bg-background/60 p-1"
      role="group"
      aria-label="名称提取模式"
    >
      {MODE_OPTIONS.map(option => {
        const selected = option.value === mode;
        return (
          <button
            key={option.value}
            type="button"
            disabled={locked}
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              "flex min-h-11 min-w-0 items-center justify-center gap-1.5 rounded border px-2 text-xs transition-colors duration-200 sm:text-sm",
              selected
                ? "border-primary bg-primary text-primary-foreground font-medium"
                : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
              locked && "cursor-not-allowed opacity-50",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            )}
            style={{ fontFamily: SANS }}
          >
            {selected &&
              (option.value === "effortful" ? (
                <TriangleAlert className="h-3.5 w-3.5 shrink-0" aria-hidden />
              ) : (
                <Check className="h-3.5 w-3.5 shrink-0" aria-hidden />
              ))}
            <span className="text-center leading-tight">{option.label}</span>
          </button>
        );
      })}
    </div>
    {locked && (
      <p className="text-xs text-primary" style={{ fontFamily: SANS }}>
        全局模拟生效中
      </p>
    )}
    </div>
  );
}

export default function RapidNaming() {
  const reduced = useReducedMotion();
  const isReduced = !!reduced;
  const isMobile = useIsMobile();
  const { enabled: simEnabled } = useSimulation();
  const [scope, animate] = useAnimate();
  const inView = useInView(scope, { once: false, amount: 0.4, margin: "-60px" });

  const [mode, setMode] = useState<FlowMode>("fluent");
  const [locked, setLocked] = useState(false);
  const [replayVersion, setReplayVersion] = useState(0);
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);
  const [trackWidth, setTrackWidth] = useState(0);
  const [flow, dispatch] = useReducer(flowReducer, undefined, () =>
    createFlowState()
  );

  const flowRef = useRef(flow);
  const modeRef = useRef<FlowMode>("fluent");

  // 保持 modeRef 与 mode state 同步，防止 setMode 直调时 ref 过期
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  // 全局模拟联动：开启→切提取困难 + 锁定；关闭→仅解锁，不回退
  useEffect(() => {
    if (simEnabled) {
      setMode("effortful");
      setLocked(true);
    } else {
      setLocked(false);
    }
  }, [simEnabled]);
  const reducedRef = useRef(isReduced);
  const mountedRef = useRef(true);
  const runIdRef = useRef(0);
  const instanceIdRef = useRef(0);
  const activeRunRef = useRef<RunContext | null>(null);
  const metricsRef = useRef({ icon: 64, checkpointX: 0 });

  reducedRef.current = isReduced;

  const ICON = isMobile ? 48 : 64;
  const SLOT_GAP = ICON + (isMobile ? 8 : 16);
  const MAX_ACTIVE_ITEMS = isMobile ? 6 : 8;
  const entryX = -ICON - 16;
  const checkpointX = trackWidth > 0 ? trackWidth * 0.68 - ICON / 2 : 0;
  const exitX = trackWidth + ICON + 16;
  const trackReady = trackWidth > 0;
  metricsRef.current = { icon: ICON, checkpointX };
  const stripeStatic = isReduced || !inView;

  const commit = useCallback(
    (action: FlowAction) => {
      const next = flowReducer(flowRef.current, action);
      flowRef.current = next;
      if (mountedRef.current) dispatch(action);
      return next;
    },
    [dispatch]
  );

  const cancelRun = useCallback((context: RunContext | null) => {
    if (!context || context.cancelled) return;

    context.cancelled = true;
    if (activeRunRef.current === context) activeRunRef.current = null;
    if (runIdRef.current === context.id) runIdRef.current += 1;

    for (const timer of Array.from(context.timers.values())) {
      window.clearTimeout(timer.id);
      timer.settle(false);
    }
    context.timers.clear();

    for (const control of Array.from(context.controls)) control.stop();
    context.controls.clear();
  }, []);

  const beginRun = useCallback(
    (runMode: FlowMode) => {
      cancelRun(activeRunRef.current);

      const context: RunContext = {
        id: ++runIdRef.current,
        mode: runMode,
        cancelled: false,
        consumerRunning: false,
        timers: new Map(),
        controls: new Set(),
      };
      activeRunRef.current = context;
      commit({ type: "reset", runId: context.id, mode: runMode });

      const stale = () =>
        context.cancelled ||
        activeRunRef.current !== context ||
        runIdRef.current !== context.id;

      const runScan = () => {
        if (reducedRef.current || stale()) return;
        const scanDistance = Math.max(0, metricsRef.current.icon - 1);
        trackControl(
          context,
          animate(
            "[data-scan]",
            { x: [0, scanDistance], opacity: [0, 0.85, 0] },
            { duration: 0.5, ease: "easeOut" }
          )
        );
      };

      const runStallShake = () => {
        if (reducedRef.current || stale()) return;
        trackControl(
          context,
          animate(
            "[data-checkpoint]",
            {
              x: [0, -6, 5, -4, 3, 0],
              rotate: [0, -0.8, 0.6, -0.4, 0],
            },
            { duration: 0.28 }
          )
        );
      };

      const warnIfQueueBlocked = (currentItem: BeltItem | null) => {
        if (
          !currentItem ||
          stale() ||
          !isLongStall(context.mode, currentItem.sequenceIndex)
        ) {
          return;
        }
        const state = flowRef.current;
        if (
          state.processingItem?.instanceId !== currentItem.instanceId ||
          state.processingItem.state !== "processing" ||
          state.waitingQueue.length === 0 ||
          state.warningInstanceId === currentItem.instanceId
        ) {
          return;
        }

        const warnedState = commit({
          type: "show-warning",
          runId: context.id,
          instanceId: currentItem.instanceId,
        });
        if (warnedState.warningInstanceId === currentItem.instanceId) {
          runStallShake();
        }
      };

      function kickConsumer() {
        if (stale() || context.consumerRunning) return;
        context.consumerRunning = true;
        void consumerLoop();
      }

      function scheduleFinishLeave(instanceId: number) {
        void (async () => {
          const left = await sleepForRun(context, LEAVE_SETTLE_MS);
          if (!left || stale()) return;
          commit({ type: "finish-leave", runId: context.id, instanceId });
        })();
      }

      async function consumerLoop() {
        try {
          while (!stale()) {
            const nextState = commit({ type: "take-next", runId: context.id });
            const currentItem = nextState.processingItem;
            if (!currentItem) break;

            const positioned = await sleepForRun(
              context,
              CHECKPOINT_TRANSFER_MS
            );
            if (!positioned || stale()) return;

            commit({
              type: "begin-processing",
              runId: context.id,
              instanceId: currentItem.instanceId,
            });
            if (stale()) return;

            const processMs = getProcessMs(
              context.mode,
              currentItem.sequenceIndex
            );
            runScan();
            warnIfQueueBlocked(currentItem);

            const processed = await sleepForRun(context, processMs);
            if (!processed || stale()) return;

            commit({
              type: "pair",
              runId: context.id,
              instanceId: currentItem.instanceId,
            });
            if (stale()) return;

            const held = await sleepForRun(context, BELT_PAIRED_HOLD_MS);
            if (!held || stale()) return;

            commit({
              type: "start-leave",
              runId: context.id,
              instanceId: currentItem.instanceId,
            });
            if (stale()) return;

            // checkpoint 已释放：离场清理独立异步完成，不阻塞下一个提取
            scheduleFinishLeave(currentItem.instanceId);
          }
        } finally {
          context.consumerRunning = false;
          if (!stale() && canTakeNext(flowRef.current)) {
            kickConsumer();
          }
        }
      }

      const releaseItem = (sequenceIndex: number, itemIndex: number) => {
        if (stale()) return;
        const item: BeltItem = {
          instanceId: ++instanceIdRef.current,
          runId: context.id,
          sequenceIndex,
          itemIndex,
          state: "entering",
        };
        commit({ type: "release", runId: context.id, item });

        void (async () => {
          const arrived = await sleepForRun(context, ENTER_SETTLE_MS);
          if (!arrived || stale()) return;
          commit({
            type: "arrive",
            runId: context.id,
            instanceId: item.instanceId,
          });
          if (stale()) return;
          warnIfQueueBlocked(flowRef.current.processingItem);
          kickConsumer();
        })();
      };

      // shuffle bag：15 个图标 Fisher-Yates 打乱，取完重洗；
      // 新袋首项避让上一袋末项，避免连续重复
      let bag: number[] = [];
      let lastTaken = -1;
      const refillBag = () => {
        bag = ITEMS.map((_, idx) => idx);
        for (let i = bag.length - 1; i > 0; i -= 1) {
          const j = Math.floor(Math.random() * (i + 1));
          [bag[i], bag[j]] = [bag[j], bag[i]];
        }
        if (bag.length > 1 && bag[0] === lastTaken) {
          [bag[0], bag[bag.length - 1]] = [bag[bag.length - 1], bag[0]];
        }
      };
      const takeFromShuffleBag = () => {
        if (bag.length === 0) refillBag();
        const idx = bag.pop() as number;
        lastTaken = idx;
        return idx;
      };
      refillBag();

      // 持续 producer：run 有效且在视口时持续释放；
      // 达到 MAX_ACTIVE_ITEMS 启用背压，有图标离场后继续
      let sequenceIndex = 0;
      void (async () => {
        while (!stale()) {
          const current = flowRef.current;
          const activeCount =
            current.incomingItems.length +
            current.waitingQueue.length +
            (current.processingItem ? 1 : 0) +
            (current.pairedItem ? 1 : 0) +
            current.leavingItems.length;
          if (activeCount >= MAX_ACTIVE_ITEMS) {
            const polled = await sleepForRun(context, BACKPRESSURE_POLL_MS);
            if (!polled || stale()) return;
            continue;
          }

          const itemIndex = takeFromShuffleBag();
          releaseItem(sequenceIndex, itemIndex);
          sequenceIndex += 1;

          const fed = await sleepForRun(context, FEED_MS);
          if (!fed || stale()) return;
        }
      })();

      return context;
    },
    [animate, cancelRun, commit, isMobile]
  );

  useLayoutEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      cancelRun(activeRunRef.current);
    };
  }, [cancelRun]);

  useEffect(() => {
    const element = scope.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      if (mountedRef.current) setTrackWidth(entry.contentRect.width);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [scope]);

  useLayoutEffect(() => {
    if (!inView || !trackReady) return;
    const context = beginRun(mode);
    return () => cancelRun(context);
  }, [beginRun, cancelRun, inView, mode, replayVersion, trackReady]);

  const handleModeChange = (nextMode: FlowMode) => {
    if (locked || modeRef.current === nextMode) return;
    cancelRun(activeRunRef.current);
    modeRef.current = nextMode;
    setMode(nextMode);
  };

  const handleReplay = () => {
    cancelRun(activeRunRef.current);
    setReplayVersion(version => version + 1);
  };

  const visibleItems = [
    ...flow.incomingItems,
    ...flow.waitingQueue,
    ...(flow.processingItem ? [flow.processingItem] : []),
    ...(flow.pairedItem ? [flow.pairedItem] : []),
    ...flow.leavingItems,
  ];

  // 动态压缩队列间距：长队列时 gap 从 SLOT_GAP 收缩到 minGap，
  // 保证不溢出左侧、中心不完全重合；minGap 允许有控制的重叠以表现拥堵
  const getQueueGap = () => {
    const checkpointOccupied =
      Boolean(flow.processingItem || flow.pairedItem) ||
      flow.waitingQueue.length > 0;
    const blockedIncoming = checkpointOccupied
      ? flow.incomingItems.length
      : Math.max(0, flow.incomingItems.length - 1);
    const visibleCount = flow.waitingQueue.length + blockedIncoming;
    const minGap = isMobile ? 26 : 36;
    if (visibleCount <= 0 || checkpointX <= 0) return SLOT_GAP;
    return Math.min(SLOT_GAP, Math.max(minGap, checkpointX / visibleCount));
  };

  const getTargetX = (beltItem: BeltItem) => {
    if (
      flow.processingItem?.instanceId === beltItem.instanceId ||
      beltItem.state === "processing" ||
      beltItem.state === "paired"
    ) {
      return checkpointX;
    }
    if (beltItem.state === "leaving") return exitX;
    const queueGap = getQueueGap();
    if (beltItem.state === "waiting") {
      const queueIndex = flow.waitingQueue.findIndex(
        item => item.instanceId === beltItem.instanceId
      );
      return checkpointX - queueGap * (queueIndex + 1);
    }

    const incomingIndex = flow.incomingItems.findIndex(
      item => item.instanceId === beltItem.instanceId
    );
    const checkpointUnavailable =
      Boolean(flow.processingItem || flow.pairedItem) ||
      flow.waitingQueue.length > 0 ||
      incomingIndex > 0;
    if (!checkpointUnavailable) return checkpointX;
    return checkpointX - queueGap * (flow.waitingQueue.length + incomingIndex + 1);
  };

  const getItemTransition = (state: BeltItemState, positioning: boolean) => {
    if (isReduced) {
      return {
        x: { duration: 0 },
        opacity: { duration: FADE_MS / 1000, ease: "easeOut" as const },
      };
    }
    if (positioning) {
      return {
        x: {
          duration: CHECKPOINT_MOVE_MS / 1000,
          ease: [0.23, 1, 0.32, 1] as const,
        },
        opacity: { duration: FADE_MS / 1000 },
      };
    }
    if (state === "entering") {
      return {
        x: { duration: ENTER_MS / 1000, ease: "linear" as const },
        opacity: { duration: FADE_MS / 1000, ease: "easeOut" as const },
      };
    }
    if (state === "leaving") {
      return {
        x: { duration: LEAVE_MS / 1000, ease: "easeIn" as const },
        opacity: { duration: LEAVE_MS / 1000, ease: "easeIn" as const },
      };
    }
    return {
      x: { duration: 0.24, ease: [0.23, 1, 0.32, 1] as const },
      opacity: { duration: FADE_MS / 1000 },
    };
  };

  const processingItem =
    flow.processingItem?.state === "processing" ? flow.processingItem : null;
  const displayPair = flow.displayPairItem;
  const displayData = displayPair ? ITEMS[displayPair.itemIndex] : null;
  const DisplayIcon = displayData?.Icon;
  const warning =
    processingItem !== null &&
    flow.warningInstanceId === processingItem.instanceId;
  const modeLabel = mode === "fluent" ? "提取流畅" : "提取困难";

  return (
    <motion.div
      initial={isReduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: isReduced ? 0 : 0.6, ease: "easeOut" }}
      className="w-full"
    >
      <p
        className="max-w-[65ch] text-pretty text-sm leading-relaxed text-muted-foreground md:text-base"
        style={{ fontFamily: SANS, fontWeight: 300 }}
      >
        三角模型说明字形、读音与含义如何相连；快速命名进一步关注，这些熟悉信息能否被迅速、连续地提取并说出。
      </p>

      <div className="relative mt-6 overflow-hidden border border-border bg-card p-5 md:p-8">
        <button
          type="button"
          onClick={handleReplay}
          aria-label={"重播" + modeLabel + "演示"}
          className="btn-press absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <RotateCcw className="h-4 w-4" aria-hidden />
        </button>

        <div className="space-y-2 pr-12">
          <h4
            className="text-lg text-foreground md:text-xl"
            style={{ fontFamily: SERIF, fontWeight: 700 }}
          >
            连续叫出这些图标
          </h4>
          <p
            className="text-sm leading-relaxed text-muted-foreground md:text-base"
            style={{ fontFamily: SANS, fontWeight: 300 }}
          >
            单个不难，难在连续、快速。
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-5 md:gap-6">
          <div className="md:col-span-2">
            <ModeControl mode={mode} onChange={handleModeChange} locked={locked} />
          </div>
          <div
            aria-live="polite"
            className="min-h-16 space-y-1.5 md:col-span-3 md:flex md:flex-col md:justify-center"
            style={{ fontFamily: SANS }}
          >
            <p className="text-sm font-medium text-foreground">
              {mode === "fluent" ? "流畅状态：" : "困难状态："}
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground" style={{ fontWeight: 300 }}>
              {mode === "fluent"
                ? "名称及时说出，后续图标不易积压。"
                : "提取需要更长时间，可能出现停顿、积压或自我纠正。"}
            </p>
          </div>
        </div>

        <div
          className="mt-6 flex min-h-7 flex-wrap items-center justify-between gap-x-3 gap-y-2 text-sm"
          style={{ fontFamily: SANS }}
        >
          <span className="text-foreground">看见 → 提取 → 说出</span>
          <span className="tabular-nums text-muted-foreground">
            等待：{flow.waitingQueue.length} 个
          </span>
        </div>

        <div
          ref={scope}
          aria-hidden="true"
          data-flow-direction={FLOW_DIRECTION}
          className="relative mt-3 h-24 w-full min-w-0 overflow-hidden rounded-md border border-border bg-background/40"
        >
          {stripeStatic ? (
            <div
              className="absolute inset-y-0 -left-6 -right-6"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, var(--muted) 0 2px, transparent 2px 24px)",
                opacity: 0.4,
              }}
            />
          ) : (
            <motion.div
              className="absolute inset-y-0 -left-6 -right-6"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, var(--muted) 0 2px, transparent 2px 24px)",
                opacity: 0.4,
              }}
              animate={{ x: [-BELT_PATTERN_PX, 0] }}
              transition={{
                duration: BELT_STRIPE_DURATION,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          )}

          <div className="absolute inset-y-0 left-0 w-px bg-border" />
          <div className="absolute inset-y-0 right-0 w-px bg-border" />
          <span
            className="absolute left-2 top-1.5 text-xs text-muted-foreground"
            style={{ fontFamily: SANS }}
          >
            入口
          </span>
          <span
            className="absolute right-2 top-1.5 text-xs text-muted-foreground"
            style={{ fontFamily: SANS }}
          >
            出口
          </span>

          <div
            key={"checkpoint-" + flow.runId}
            data-checkpoint
            className={cn(
              "absolute inset-y-3 flex items-center justify-center rounded-md border transition-colors duration-200",
              warning
                ? "border-destructive/60 bg-destructive/5"
                : "border-primary/40 bg-primary/5"
            )}
            style={{ left: checkpointX, width: ICON }}
          >
            <span
              className={cn(
                "text-xs leading-none",
                warning ? "text-destructive" : "text-primary"
              )}
              style={{ fontFamily: SANS }}
            >
              提取
            </span>
          </div>

          {!isReduced && (
            <div
              key={"scan-" + flow.runId}
              data-scan
              className="absolute inset-y-3 w-px bg-primary"
              style={{ left: checkpointX, opacity: 0 }}
            />
          )}

          <div key={flow.runId} className="absolute inset-0">
            {visibleItems.map(beltItem => {
              const targetX = getTargetX(beltItem);
              const item = ITEMS[beltItem.itemIndex];
              const positioning =
                flow.processingItem?.instanceId === beltItem.instanceId &&
                beltItem.state === "entering";
              const visualPhase =
                positioning ||
                beltItem.state === "processing" ||
                beltItem.state === "paired"
                  ? "checkpoint"
                  : beltItem.state;
              const motionKey =
                beltItem.runId +
                "-" +
                beltItem.instanceId +
                (isReduced ? "-" + visualPhase + "-" + Math.round(targetX) : "");
              return (
                <motion.div
                  key={motionKey}
                  data-belt-instance={beltItem.instanceId}
                  data-belt-state={beltItem.state}
                  className="absolute inset-y-0 left-0 flex items-center"
                  initial={{
                    x: isReduced ? targetX : entryX,
                    opacity: isReduced && beltItem.state === "leaving" ? 1 : 0,
                  }}
                  animate={{
                    x: targetX,
                    opacity: beltItem.state === "leaving" ? 0 : 1,
                  }}
                  transition={getItemTransition(beltItem.state, positioning)}
                >
                  <IconCard
                    item={item}
                    size={ICON}
                    variant={beltItem.state === "waiting" ? "queue" : "active"}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-3 min-h-[1.5rem] text-center">
          <AnimatePresence initial={false}>
            {warning && (
              <motion.p
                key={"warning-" + flow.warningInstanceId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: isReduced ? 0 : 0.12 }}
                className="text-xs text-destructive"
                style={{ fontFamily: SANS }}
              >
                名称提取出现停顿
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="grid min-h-[7rem] place-items-center py-2">
          <AnimatePresence initial={false} mode="sync">
            {displayPair && displayData && DisplayIcon ? (
              <motion.div
                key={"paired-" + displayPair.instanceId}
                initial={{ opacity: 0, y: isReduced ? 0 : 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: isReduced ? 0 : PAIR_TRANSITION_MS / 1000,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="col-start-1 row-start-1 flex max-w-full flex-wrap items-center justify-center gap-3 text-center"
              >
                <DisplayIcon className="h-8 w-8 text-primary" aria-hidden />
                <span
                  className="text-lg text-foreground"
                  style={{ fontFamily: SERIF }}
                >
                  {displayData.label}
                </span>
                <span
                  className="text-base tabular-nums text-primary"
                  style={{ fontFamily: GROTESK }}
                >
                  {displayData.pinyin}
                </span>
              </motion.div>
            ) : (
              <motion.p
                key={"empty-" + flow.runId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: isReduced ? 0 : 0.12 }}
                className="col-start-1 row-start-1 text-center text-xs text-muted-foreground"
                style={{ fontFamily: SANS, fontWeight: 300 }}
              >
                等待下一个图标到达检查点
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <p
          className="mt-6 text-center text-xs text-muted-foreground"
          style={{ fontFamily: SANS, fontWeight: 300 }}
        >
          仅作科普演示，不用于筛查或诊断。
          <CitationRef id={1} />
        </p>

        <Collapsible
          open={collapsibleOpen}
          onOpenChange={setCollapsibleOpen}
          className="mt-3 border-t border-border"
        >
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="flex w-full items-center justify-between py-3 text-left transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span
              className="text-sm text-foreground"
              style={{ fontFamily: SERIF }}
            >
              为什么与阅读有关？
            </span>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-muted-foreground transition-transform",
                collapsibleOpen && "rotate-180"
              )}
              aria-hidden
            />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-3 pb-1 pt-2">
            <p
              className="text-sm leading-relaxed text-muted-foreground"
              style={{ fontFamily: SANS, fontWeight: 300 }}
            >
              快速命名（Rapid Automatized
              Naming，RAN）要求尽可能快地连续说出熟悉图形（字母、数字、颜色、物品）的名称。研究发现它与阅读流畅性存在群体层面的关联，是与阅读障碍相关的认知能力之一。
              <CitationRef id={5} />
            </p>
            <p
              className="text-sm leading-relaxed text-muted-foreground"
              style={{ fontFamily: SANS, fontWeight: 300 }}
            >
              上面的「停顿」只是概念演示，用来表现名称提取不够迅速、不够连续时的感受，并不等于某个孩子一定「叫错名字」或「不认识物品」。RAN
              困难也可能表现为提取速度偏慢、稳定性不足，而非错误。
              <CitationRef id={1} />
            </p>
            <p
              className="text-xs leading-relaxed text-muted-foreground"
              style={{ fontFamily: SANS, fontWeight: 300 }}
            >
              相关结论来自群体层面的元分析，不能直接套用到单一个体。是否需要专业评估，应结合个人发展史、家族史与多份标准化测试，由专业人员判断。如需支持，可参考「行动建议」板块或咨询学校心理老师、儿童保健医生与阅读障碍专科门诊。
            </p>
          </div>
        </CollapsibleContent>
        </Collapsible>
      </div>
    </motion.div>
  );
}

function IconCard({
  item,
  size,
  variant,
}: {
  item: NamingItem;
  size: number;
  variant: "active" | "queue";
}) {
  const Icon = item.Icon;
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-md border",
        variant === "active"
          ? "border-primary/50 bg-card shadow-sm"
          : "border-border bg-card/70"
      )}
      style={{ width: size, height: size }}
    >
      <Icon
        size={Math.round(size * (variant === "active" ? 0.6 : 0.5))}
        className={
          variant === "active" ? "text-primary" : "text-muted-foreground"
        }
        aria-hidden
      />
    </div>
  );
}

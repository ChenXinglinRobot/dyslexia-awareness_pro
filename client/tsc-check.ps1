$out = npx tsc --noEmit --ignoreDeprecations 5.0 2>&1
$out | Out-File -FilePath tsc-out.txt -Encoding utf8
$out | Select-String -Pattern 'client/src/components/RapidNaming\.tsx'

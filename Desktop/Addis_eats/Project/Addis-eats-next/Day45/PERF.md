# Lighthouse Performance Results

Mobile Lighthouse results before and after optimization. The score varied
between repeated runs, so the post-optimization result is reported as a range.

| Metric | Before | After | Change |
| --- | ---: | ---: | ---: |
| Performance score | 39 | 60–88 (observed range; median 85) | +21 to +49 points |
| First Contentful Paint (FCP) | 3.1 s | 1.7 s | 1.4 s faster |
| Largest Contentful Paint (LCP) | 7.4 s | 2.2 s | 5.2 s faster |
| Total Blocking Time (TBT) | 1,790 ms | 480 ms | 1,310 ms lower |
| Cumulative Layout Shift (CLS) | 0.059 | 0 | 0.059 lower |
| Speed Index | 5.0 s | 2.8 s | 2.2 s faster |

The after-metric values shown above are from one recorded run with a score of
85. Subsequent runs produced scores of 60 and 88, giving an observed
post-optimization range of 60–88 across the three reported runs. The median
score is 85. Metrics for the 60- and 88-point runs were not recorded, so their
individual metric values are not compared here.

## Optimization notes

- Added responsive `sizes` information to menu dish images so mobile browsers
  can request an image closer to its rendered size.
- Preloaded the first menu dish image to help the likely Largest Contentful
  Paint image load sooner.

The recorded 85-point run shows improvement across all reported metrics.
Lighthouse scores are estimates and can vary between runs; the observed range
is more representative than treating one run as a guaranteed score. These
results do not prove that any one change caused the full score increase.

## Third-party scripts

No third-party scripts were found in the application. The app was checked for
`<script>`, `<Script>`, and `next/script` usages, so no third-party script
conversion was needed.

## Lighthouse run warning

Lighthouse reported that stored IndexedDB data may have affected loading
performance. For a more reliable comparison, run at least three audits in an
incognito window, using the same page, device emulation, and throttling each
time. Record every score and metric, and compare the median scores rather than
relying on a single run.

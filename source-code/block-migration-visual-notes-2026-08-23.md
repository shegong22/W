# Block migration visual notes — 2026-08-23

The local `/W/laboratory/` screenshot rendered the existing Manufacturing page shell and facility capability area without a layout break; the migrated Global B2B Support block is below the initial 1200px viewport and requires a delayed/full-page or DOM check.

The local `/W/partners/` screenshot showed the page shell and CTA but the hero/content text was still visually transparent at capture time. This is treated as an entrance-animation timing artifact from the direct Chromium screenshot, not as evidence that the page content was deleted. A delayed DOM/full-page capture is required before final publication.


## Delayed-render verification

A delayed 1440px desktop render shows the Manufacturing page in the sequence `Facility Capability` → `Manufacturing Workflow / Traceable Stages` → `Global B2B Support`. The migrated heading, supporting paragraph, and all three partner-region images/cards are visible directly after the workflow block, with no Customer Feedback preview remaining.

A delayed 390px render shows the same Manufacturing content in a single-column mobile flow. The process stages stack vertically and the migrated partner cards follow the same responsive pattern. The capture shows no visible horizontal overflow or clipped card content.

The Partners page retains its `Partnership Principles` section and no longer renders the moved `Global B2B Support` block. The standalone `/feedback/` page remains a separate route and source component.


## Live deployment regression

Commit `0c3f646` was pushed to `shegong22/W` and the GitHub Pages workflow completed successfully. The live `/laboratory/`, `/partners/`, and `/feedback/` routes each returned HTTP 200 and referenced the new `index-CbROVQzU.js` bundle.

Live DOM verification found on `/laboratory/`: zero `CUSTOMER FEEDBACK / FIELD NOTES` markers, one `GLOBAL B2B SUPPORT` block, one `A clear partner path across markets.` heading, and one Manufacturing Workflow marker. On `/partners/`, the moved Global B2B Support block and heading were absent, while `PARTNERSHIP PRINCIPLES` remained. The standalone Feedback route still served the current bundle and returned HTTP 200.

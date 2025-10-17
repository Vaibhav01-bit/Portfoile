 the # Task: Fix Background Overlays in Portfolio Website

## Steps to Complete

- [ ] Step 1: Edit style.css to lower z-index for background elements (.bg-anim and .bg-canvas) to -1 to ensure they stay behind content sections.
- [ ] Step 2: Add explicit z-index: 1 to .section class to stack all main content sections above the backgrounds.
- [ ] Step 3: Adjust .blob positioning and sizes in style.css (reduce widths/heights by ~10-20%, tweak left/right/top/bottom values) to prevent edge spillover and better containment.
- [ ] Step 4: Relaunch the browser and scroll through sections (e.g., Skills, Experience) to verify no overlays occur during animations or parallax.
- [ ] Step 5: Test responsiveness (resize window) and interactions (mousemove for parallax) to confirm smooth behavior.
- [ ] Step 6: Update this TODO.md to mark all steps as completed and finalize the task.

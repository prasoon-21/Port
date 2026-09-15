Add-Type -AssemblyName System.Drawing

$catPath = "C:\Users\mishr\.gemini\antigravity-ide\brain\7796dd5b-eb62-42b7-b462-7d7fc6b4cee7\.user_uploaded\media_1789456312500.jpg"
$outPath = "p:\Portfolio\public\og-image.png"

$width = 1200
$height = 630

$bmp = New-Object System.Drawing.Bitmap $width, $height
$g = [System.Drawing.Graphics]::FromImage($bmp)

$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

# Helper to create rounded rectangle path
function Get-RoundedRectPath([float]$x, [float]$y, [float]$w, [float]$h, [float]$r) {
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $d = $r * 2
    $path.AddArc($x, $y, $d, $d, 180, 90)
    $path.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
    $path.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
    $path.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
    $path.CloseFigure()
    return $path
}

# 1. Background gradient (deep obsidian & navy)
$bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.Point 0, 0),
    (New-Object System.Drawing.Point $width, $height),
    [System.Drawing.Color]::FromArgb(255, 11, 15, 25),
    [System.Drawing.Color]::FromArgb(255, 17, 24, 39)
)
$g.FillRectangle($bgBrush, 0, 0, $width, $height)
$bgBrush.Dispose()

# 2. Tech grid dots (subtle cyberpunk pattern)
$dotBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(18, 255, 255, 255))
for ($dx = 40; $dx -lt $width; $dx += 40) {
    for ($dy = 40; $dy -lt $height; $dy += 40) {
        $g.FillEllipse($dotBrush, $dx, $dy, 2, 2)
    }
}
$dotBrush.Dispose()

# 3. Vibrant ambient glows
# Cyan glow behind cat
$glowCyan = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(35, 0, 229, 255))
$g.FillEllipse($glowCyan, 680, 50, 520, 520)
$glowCyan.Dispose()

# Indigo glow top-left
$glowIndigo = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(45, 99, 102, 241))
$g.FillEllipse($glowIndigo, -80, -80, 600, 600)
$glowIndigo.Dispose()

# 4. Subtle overall card border
$cardFramePath = Get-RoundedRectPath 24 24 ($width - 48) ($height - 48) 20
$cardBorderPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(45, 255, 255, 255), 1.5)
$g.DrawPath($cardBorderPen, $cardFramePath)
$cardBorderPen.Dispose()
$cardFramePath.Dispose()

# 5. Right side: Cat Card with Rounded Corners and Glowing Border
$catImg = [System.Drawing.Image]::FromFile($catPath)
$catSize = 490
$catX = 640
$catY = 70
$catRadius = 24

# Cat Card shadow
$catShadowPath = Get-RoundedRectPath ($catX + 8) ($catY + 12) $catSize $catSize $catRadius
$shadowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(100, 0, 0, 0))
$g.FillPath($shadowBrush, $catShadowPath)
$shadowBrush.Dispose()
$catShadowPath.Dispose()

# Clip cat image to rounded rect
$catPathClip = Get-RoundedRectPath $catX $catY $catSize $catSize $catRadius
$state = $g.Save()
$g.SetClip($catPathClip)
$g.DrawImage($catImg, $catX, $catY, $catSize, $catSize)
$g.Restore($state)

# Cat Card glowing border
$catBorderPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(180, 0, 229, 255), 2.5)
$g.DrawPath($catBorderPen, $catPathClip)
$catBorderPen.Dispose()
$catPathClip.Dispose()
$catImg.Dispose()

# 6. Left side typography & info
# Pill Badge: "AI ENGINEER & CREATIVE DEVELOPER"
$badgePath = Get-RoundedRectPath 64 68 360 36 18
$badgeBg = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(35, 0, 229, 255))
$badgePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(140, 0, 229, 255), 1.2)
$g.FillPath($badgeBg, $badgePath)
$g.DrawPath($badgePen, $badgePath)
$badgeBg.Dispose()
$badgePen.Dispose()
$badgePath.Dispose()

# Glowing dot in badge
$dotGlow = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 0, 229, 255))
$g.FillEllipse($dotGlow, 82, 81, 10, 10)
$dotGlow.Dispose()

$fontBadge = New-Object System.Drawing.Font("Segoe UI", 10.5, [System.Drawing.FontStyle]::Bold)
$brushBadgeText = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 207, 250, 254))
$g.DrawString("AI ENGINEER & CREATIVE DEVELOPER", $fontBadge, $brushBadgeText, 102, 76)
$fontBadge.Dispose()
$brushBadgeText.Dispose()

# Name Title: "Prasoon Mishra"
$fontName = New-Object System.Drawing.Font("Segoe UI", 48, [System.Drawing.FontStyle]::Bold)
$brushName = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 255, 255, 255))
$g.DrawString("Prasoon Mishra", $fontName, $brushName, 60, 126)
$fontName.Dispose()
$brushName.Dispose()

# Subtitle
$fontSub = New-Object System.Drawing.Font("Segoe UI", 20, [System.Drawing.FontStyle]::Bold)
$brushSub = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.Point 64, 218),
    (New-Object System.Drawing.Point 550, 218),
    [System.Drawing.Color]::FromArgb(255, 147, 197, 253),
    [System.Drawing.Color]::FromArgb(255, 56, 189, 248)
)
$bullet = [char]0x2022
$g.DrawString("AI $bullet Salesforce $bullet Creative Frontend", $fontSub, $brushSub, 64, 218)
$fontSub.Dispose()
$brushSub.Dispose()

# Description Paragraph (matching user's og:description)
$fontDesc = New-Object System.Drawing.Font("Segoe UI", 14.5, [System.Drawing.FontStyle]::Regular)
$brushDesc = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 156, 163, 175))
$desc = "Explore my projects in AI, Salesforce, full-stack`ndevelopment and creative frontend engineering."
$g.DrawString($desc, $fontDesc, $brushDesc, 64, 280)
$fontDesc.Dispose()
$brushDesc.Dispose()

# Feature Badges
$badges = @("Salesforce LWC", "Agentic AI", "Three.js", "Full-Stack")
$bx = 64
$by = 380
$fontPill = New-Object System.Drawing.Font("Segoe UI", 11, [System.Drawing.FontStyle]::Regular)
$brushPillBg = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(35, 255, 255, 255))
$penPillBorder = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(65, 255, 255, 255), 1)
$brushPillText = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 226, 232, 240))

foreach ($b in $badges) {
    $sz = $g.MeasureString($b, $fontPill)
    $pw = [int]$sz.Width + 24
    $ph = 34
    $pPath = Get-RoundedRectPath $bx $by $pw $ph 10
    $g.FillPath($brushPillBg, $pPath)
    $g.DrawPath($penPillBorder, $pPath)
    $pPath.Dispose()
    $g.DrawString($b, $fontPill, $brushPillText, $bx + 12, $by + 7)
    $bx += $pw + 12
}
$fontPill.Dispose()
$brushPillBg.Dispose()
$penPillBorder.Dispose()
$brushPillText.Dispose()

# Website Domain link badge at bottom
$domainPath = Get-RoundedRectPath 64 478 290 42 12
$domainBg = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(25, 0, 229, 255))
$domainPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(90, 0, 229, 255), 1)
$g.FillPath($domainBg, $domainPath)
$g.DrawPath($domainPen, $domainPath)
$domainBg.Dispose()
$domainPen.Dispose()
$domainPath.Dispose()

# Small globe / link icon indicator
$gDot = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 52, 211, 153))
$g.FillEllipse($gDot, 80, 493, 10, 10)
$gDot.Dispose()

$fontUrl = New-Object System.Drawing.Font("Segoe UI", 12.5, [System.Drawing.FontStyle]::Bold)
$brushUrl = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 255, 255, 255))
$g.DrawString("prasoon-portfolio.pages.dev", $fontUrl, $brushUrl, 98, 488)
$fontUrl.Dispose()
$brushUrl.Dispose()

# Save final 1200x630 PNG
$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()

Write-Output "Generated 1200x630 OG Image at $outPath"

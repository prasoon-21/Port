Add-Type -AssemblyName System.Drawing

$catPath = "C:\Users\mishr\.gemini\antigravity-ide\brain\7796dd5b-eb62-42b7-b462-7d7fc6b4cee7\.user_uploaded\media_1789456312500.jpg"
$outPath = "p:\Portfolio\public\og-image.png"

$orig = [System.Drawing.Image]::FromFile($catPath)

# Remove the rounded corner border from original (inset by 24px)
$inset = 24
$cropW = $orig.Width - ($inset * 2)
$cropH = $orig.Height - ($inset * 2)
$cropBmp = New-Object System.Drawing.Bitmap $cropW, $cropH
$cg = [System.Drawing.Graphics]::FromImage($cropBmp)
$cg.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$cg.DrawImage($orig, [System.Drawing.Rectangle]::new(0, 0, $cropW, $cropH), [System.Drawing.Rectangle]::new($inset, $inset, $cropW, $cropH), [System.Drawing.GraphicsUnit]::Pixel)
$cg.Dispose()
$orig.Dispose()

$targetW = 1200
$targetH = 630

$bmp = New-Object System.Drawing.Bitmap $targetW, $targetH
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

# Fill background with dark bedroom ambiance (#100b0e)
$bgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 16, 11, 14))
$g.FillRectangle($bgBrush, 0, 0, $targetW, $targetH)
$bgBrush.Dispose()

# Fit cat to full height (630px)
$catH = $targetH
$catW = [int]($cropW * ($catH / $cropH))
$catX = [int](($targetW - $catW) / 2)
$catY = 0

# Draw scaled background on sides with blur/darkening effect so it's not empty black
$sideScale = [Math]::Max($targetW / $cropW, $targetH / $cropH)
$sideW = [int]($cropW * $sideScale)
$sideH = [int]($cropH * $sideScale)
$sideX = [int](($targetW - $sideW) / 2)
$sideY = [int](($targetH - $sideH) / 2)
$g.DrawImage($cropBmp, $sideX, $sideY, $sideW, $sideH)

# Dark overlay on whole canvas before drawing sharp center cat
$darkOverlay = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(210, 12, 9, 12))
$g.FillRectangle($darkOverlay, 0, 0, $targetW, $targetH)
$darkOverlay.Dispose()

# Draw sharp cat in center
$g.DrawImage($cropBmp, $catX, $catY, $catW, $catH)
$cropBmp.Dispose()

# Seamlessly blend left and right edges with soft linear gradient
$fadeWidth = 70
$leftBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    [System.Drawing.PointF]::new($catX, 0),
    [System.Drawing.PointF]::new($catX + $fadeWidth, 0),
    [System.Drawing.Color]::FromArgb(255, 16, 11, 14),
    [System.Drawing.Color]::FromArgb(0, 16, 11, 14)
)
$g.FillRectangle($leftBrush, $catX - 5, 0, $fadeWidth + 5, $targetH)
$leftBrush.Dispose()

$rightBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    [System.Drawing.PointF]::new($catX + $catW - $fadeWidth, 0),
    [System.Drawing.PointF]::new($catX + $catW, 0),
    [System.Drawing.Color]::FromArgb(0, 16, 11, 14),
    [System.Drawing.Color]::FromArgb(255, 16, 11, 14)
)
$g.FillRectangle($rightBrush, $catX + $catW - $fadeWidth, 0, $fadeWidth + 5, $targetH)
$rightBrush.Dispose()

$g.Dispose()

$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Output "Generated 1200x630 purely cat og-image at $outPath"

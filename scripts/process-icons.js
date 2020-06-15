let icons=[
    {src:"www/icons/icon-1024.png", size:"1024"},
    {src:"www/icons/icon-20@2x.png", size:"40"},
    {src:"www/icons/icon-20@3x.png", size:"60"},
    {src:"www/icons/icon-20.png", size:"20"},
    {src:"www/icons/icon-24@2x.png", size:"512"},
    {src:"www/icons/icon-27.5@2x.png", size:"512"},
    {src:"www/icons/icon-29@2x.png", size:"58"},
    {src:"www/icons/icon-29@3x.png", size:"87"},
    {src:"www/icons/icon-29.png", size:"29"},
    {src:"www/icons/icon-40@2x.png", size:"80"},
    {src:"www/icons/icon-40.png", size:"40"},
    {src:"www/icons/icon-44@2x.png", size:"512"},
    {src:"www/icons/icon-50@2x.png", size:"100"},
    {src:"www/icons/icon-50.png", size:"50"},
    {src:"www/icons/icon-60@2x.png", size:"120"},
    {src:"www/icons/icon-60@3x.png", size:"180"},
    {src:"www/icons/icon-72@2x.png", size:"144"},
    {src:"www/icons/icon-72.png", size:"72"},
    {src:"www/icons/icon-76@2x.png", size:"152"},
    {src:"www/icons/icon-76.png", size:"76"},
    {src:"www/icons/icon-83.5@2x.png", size:"167"},
    {src:"www/icons/icon-86@2x.png", size:"512"},
    {src:"www/icons/icon-98@2x.png", size:"512"},
    {src:"www/icons/icon-small@2x.png", size:"58"},
    {src:"www/icons/icon-small@3x.png", size:"87"},
    {src:"www/icons/icon-small.png", size:"29"}
]

for (let icon of icons) {
	console.log(
		"convert www/icons/hoodmode-icon-ios.png"+
		" -resize "+icon.size+"x"+icon.size+
		" "+icon.src
	);
}
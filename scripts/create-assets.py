"""Build the original demo SVGs and textures. Optional maintainer script (Python + Pillow).
No reference-website assets are used. Fonts and world outlines retain their licenses.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math, json, re, urllib.request, html
ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public'
SPECS = [
 ('kindred-cover','Kindred Cover','Health cover, understood.','#86ca43'),
 ('tempo','Tempo','A little movement. A little room.','#b9df72'),
 ('current','Current','Your home, in a better light.','#dfc661'),
 ('panel-studio','Panel Studio','Your next story starts here.','#bfa8ed'),
 ('fieldhouse','Fieldhouse','The next game, all together.','#ef845d'),
 ('good-work','Good Work','Find a role that fits your life.','#b6cada'),
 ('orbit','Orbit','The useful things. At a glance.','#aba2df'),
 ('small-hours','Small Hours','Good things take a little care.','#dd9fbc'),
 ('neighbourhood','Neighbourhood','Good things, closer to home.','#94b5a0'),
 ('maison-rue','Maison Rue','Somewhere worth slowing down.','#c2a18a'),
 ('mira-card','Mira Card','A thoughtful little introduction.','#c8c9df'),
 ('type-garden','Type Garden','Let your understanding grow.','#e6a9b4'),
 ('mark-library','Mark Library','Small marks, lasting impressions.','#c9d5a6'),
 ('daylight-apps','Daylight','A little more space for good work.','#abc4df'),
 ('open-studio','Open Studio','Ideas are better when they move.','#f1f493'),
]
def esc(s): return html.escape(str(s))
def txt(x,y,text,size=18,color='#252925',weight=400,**kwargs):
 attrs=' '.join(f'{k.replace("_","-")}="{v}"' for k,v in kwargs.items())
 return f'<text x="{x}" y="{y}" font-family="Arial,Helvetica,sans-serif" font-size="{size}" font-weight="{weight}" fill="{color}" {attrs}>{esc(text)}</text>'
def rect(x,y,w,h,color,rx=14,**kwargs):
 attrs=' '.join(f'{k.replace("_","-")}="{v}"' for k,v in kwargs.items())
 return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{color}" rx="{rx}" {attrs}/>'
def wrap(s): return '<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="800" viewBox="0 0 1000 800">'+s+'</svg>'
for i,(slug,name,tag,accent) in enumerate(SPECS):
 # A branded editorial product homepage.
 s=rect(0,0,1000,800,'#f6f7f3',0)
 s+=rect(24,24,952,752,'#fff',24)
 s+=txt(64,78,name,29,weight=700)+txt(580,75,'Explore',16)+txt(680,75,'Our approach',16)
 s+=rect(834,45,100,42,accent,22)+txt(856,72,'Start',16,weight=600)
 s+=txt(72,163,'MADE FOR REAL LIFE',12,'#7c8378',600,letter_spacing='2')
 words=tag.split();line1=' '.join(words[:max(2,len(words)//2)]);line2=' '.join(words[max(2,len(words)//2):])
 s+=txt(70,243,line1,52,weight=700,letter_spacing='-2')+txt(70,300,line2,52,weight=700,letter_spacing='-2')
 s+=txt(72,350,'Less noise. More useful choices.',19,'#747a70')
 s+=rect(72,389,204,52,accent,26)+txt(103,422,'Find your next step',17,weight=600)
 s+=txt(72,470,'A considered experience, at your own pace.',13,'#8b9187')
 s+=rect(540,143,360,359,'#eef1e9',22)
 if i in [6,10,12]:
  # Identifiable object / identity study rather than another screen.
  s+=rect(635,180,172,242,'#212725',36)+rect(647,193,148,215,accent,28)
  s+=txt(673,275,'10:24',36,'#202522',700)+txt(676,308,'A GOOD DAY',10,'#202522',700,letter_spacing='2')
  for n in range(3): s+=f'<circle cx="{680+n*32}" cy="350" r="9" fill="#202522" opacity="{.4+n*.25}"/>'
 elif i in [8,2,4]:
  for n in range(7):
   x=560+n*44;h=100+int(80*math.sin(n*1.4+i))
   s+=rect(x,370-h,32,h,accent if n%2 else '#d2dbc5',4)
  s+=txt(567,450,'A SMALL CHANGE, MADE VISIBLE',12,weight=600)
 else:
  s+=rect(582,180,276,255,'#fff',20)+txt(605,218,'Let’s make it simpler.',20,weight=600)
  s+=txt(605,246,'What matters to you today?',12,'#7b8279')
  for n,t in enumerate(['A clearer picture','A useful next step','Room to ask a question']):
   s+=rect(602,267+n*49,235,39,accent if n==0 else '#f3f4ef',12)
   s+=txt(617,292+n*49,t,12,weight=500)
 s+=txt(72,560,'Small details. A better experience.',28,weight=600)
 for n,(title,body) in enumerate([('A clear place to start','The useful things come first.'),('Your pace, not ours','A little room to think.'),('No hidden surprises','Honest information. Always.')]):
  x=72+n*294;s+=rect(x,587,267,139,'#f2f4ee',18)
  s+=f'<circle cx="{x+31}" cy="620" r="11" fill="{accent}"/>'+txt(x+22,625,str(n+1),12,weight=600)
  s+=txt(x+22,657,title,16,weight=600)+txt(x+22,687,body,12,'#737b6f')
 (PUBLIC/'projects'/f'{slug}-0.svg').write_text(wrap(s))
 # A real, carefully typeset data interface.
 s=rect(0,0,1000,800,'#e9ece6',0)+rect(38,48,924,704,'#fdfefb',18)
 s+=rect(38,48,190,704,'#242c27',18)+rect(216,48,12,704,'#242c27',0)
 s+=txt(65,103,name,23,'#fff',700)
 for n,t in enumerate(['Overview','Activity','Your plans','People','Saved','Settings']):
  if n==0:s+=rect(55,149,155,39,accent,8)
  s+=txt(76,174+n*50,t,14,('#222a23' if n==0 else '#bac3b9'),600 if n==0 else 400)
 s+=txt(65,697,'A little more clarity.',11,'#c2cbc1')
 s+=txt(268,115,'A good place to begin.',31,weight=600)+txt(270,146,'Here is what is worth your attention today.',14,'#7c8479')
 s+=rect(840,88,78,35,accent,18)+txt(858,111,'Week',12,weight=600)
 for n,(label,value) in enumerate([('THIS WEEK','24.8'),('YOUR PROGRESS','+12%'),('NEXT STEPS','3')]):
  x=268+n*216;s+=rect(x,185,200,126,'#f0f3eb',14)
  s+=txt(x+19,217,label,10,'#7b8476',600,letter_spacing='1')+txt(x+19,262,value,34,weight=600)+txt(x+19,288,'A useful thing to know',10,'#7b8476')
 s+=rect(268,332,631,230,'#f3f5ee',14)+txt(292,368,'A little perspective',18,weight=600)
 for n in range(11):
  h=28+abs(math.sin(n*.8+i))*110;s+=rect(300+n*49,524-h,24,h,accent if n%3 else '#d6dece',4)
 s+=txt(304,548,'MON',9,'#747f6e')+txt(550,548,'THU',9,'#747f6e')+txt(828,548,'SUN',9,'#747f6e')
 for n,t in enumerate(['The next useful question','A shared decision','Something worth saving']):
  y=589+n*43;s+=rect(269,y,630,37,'#f3f5ef',7)+f'<circle cx="288" cy="{y+18}" r="5" fill="{accent}"/>'
  s+=txt(307,y+23,t,12)+txt(807,y+23,'View →',11,'#77826f')
 (PUBLIC/'projects'/f'{slug}-1.svg').write_text(wrap(s))
 # Mobile journey: four readable screens, not borrowed mock-ups.
 s=rect(0,0,1000,800,'#e9ece7',0)+txt(60,74,name.upper()+' / A CONSIDERED JOURNEY',18,'#465341',700,letter_spacing='2')
 for n in range(4):
  x=55+n*231;s+=rect(x,128,205,561,'#fff',25,stroke='#c9d0c4',stroke_width=2)
  s+=txt(x+16,156,'9:41',9,weight=600)+rect(x+78,140,49,8,'#e1e5de',4)
  s+=txt(x+18,196,name,15,weight=700)
  s+=rect(x+17,221,171,5,'#eef1e8',3)+rect(x+17,221,42*(n+1),5,accent,3)
  for ln,t in enumerate([['A good place','to start.'],['What matters','to you?'],['A little more','perspective.'],['Your next','useful step.']][n]):
   s+=txt(x+17,266+ln*27,t,24,weight=600,letter_spacing='-.5')
  s+=txt(x+17,330,'We’ll make this simple.',10,'#808879')
  for k,t in enumerate(['A clearer picture','Something practical','Room to think']):
   s+=rect(x+17,353+k*64,171,49,accent if k==n%3 else '#f3f5ee',10)
   s+=f'<circle cx="{x+34}" cy="{377+k*64}" r="4" fill="#526047"/>'+txt(x+47,382+k*64,t,10,weight=500)
  s+=rect(x+17,594,171,40,'#242d24',20)+txt(x+65,619,('Continue' if n<3 else 'Let’s begin'),12,'#fff',600)
  s+=txt(x+57,665,'YOUR PACE. ALWAYS.',7,'#86927d',600,letter_spacing='1')
 (PUBLIC/'projects'/f'{slug}-2.svg').write_text(wrap(s))

# Image optimisation — the original PNGs are local art-generation inputs only.
for name,width in [('portrait',976),('profile',1000),('skyline',1200)]:
 p=PUBLIC/'images'/f'{name}.png'
 if p.exists():
  im=Image.open(p).convert('RGB');im.thumbnail((width,1600));im.save(PUBLIC/'images'/f'{name}.webp',quality=88)
portrait=Image.open(PUBLIC/'images'/'portrait.webp')
# Crop a recognisable headshot for the circular navigation button.
w,h=portrait.size;portrait.crop((w*.26,h*.04,w*.74,h*.44)).resize((160,160)).save(PUBLIC/'images'/'avatar.webp',quality=90)

# Original editorial book covers.
book_specs=[('Small Decisions','Notes on everyday interfaces','#88c7ee','#122c4e'),('Make Space','A field guide to less','#f4da6a','#26251c'),('Unreasonable Clarity','People before patterns','#152f35','#faf8ef'),('Ways of Seeing Systems','Connections worth noticing','#e5adbd','#502e48'),('The Useful Detail','Craft and care','#e5e7db','#1b322b')]
for i,(title,sub,bg,ink) in enumerate(book_specs):
 s=rect(0,0,360,520,bg,0)+txt(27,49,'MIRI / STUDIO NOTES',12,ink,600,letter_spacing='2')
 words=title.split();y=112
 for word in words:s+=txt(25,y,word,43 if len(word)<11 else 35,ink,700,letter_spacing='-1');y+=51
 for n in range(9):
  r=12+n*9;cx=175+math.sin(i)*25;cy=347
  s+=f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{ink}" stroke-width="1.5" opacity=".4"/>'
 s+=txt(27,468,sub,12,ink)+txt(27,495,'A fictional cover / Original artwork',9,ink)
 (PUBLIC/'images'/f'book-{i}.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 520">'+s+'</svg>')

# Self-host the exact font families observed in the reference.
ua='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
for family,query,out in [('Inter','Inter:wght@100..900','inter-latin.woff2'),('Playfair Display','Playfair+Display:ital,wght@0,400..900','playfair-latin.woff2'),('Playfair Display Italic','Playfair+Display:ital,wght@1,400..900','playfair-italic-latin.woff2')]:
 url='https://fonts.googleapis.com/css2?family='+query+'&display=swap'
 css=urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':ua}),timeout=30).read().decode()
 font_url=re.findall(r'url\(([^)]+)\)',css)[-1]
 (PUBLIC/'fonts'/out).write_bytes(urllib.request.urlopen(font_url,timeout=30).read())
for family in ['inter','playfairdisplay']:
 url=f'https://raw.githubusercontent.com/google/fonts/main/ofl/{family}/OFL.txt'
 (PUBLIC/'fonts'/f'{family}-LICENSE.txt').write_bytes(urllib.request.urlopen(url,timeout=30).read())

# A new dark globe texture drawn from public-domain Natural Earth outlines.
url='https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson'
world=json.loads(urllib.request.urlopen(url,timeout=30).read())
im=Image.new('RGB',(2048,1024),(5,7,8));draw=ImageDraw.Draw(im)
for feature in world['features']:
 geom=feature['geometry'];polys=geom['coordinates'] if geom['type']=='MultiPolygon' else [geom['coordinates']]
 for poly in polys:
  points=[((lng+180)/360*2048,(90-lat)/180*1024) for lng,lat,*_ in poly[0]]
  # Natural Earth polygons already split at the antimeridian.
  draw.polygon(points,fill=(23,26,27),outline=(25,29,30))
im.save(PUBLIC/'images'/'earth-dark.jpg',quality=94)

# Social card: a meaningful fallback even when a crawler cannot run React.
fontdir=Path('/usr/share/fonts/truetype/dejavu')
f=ImageFont.truetype(str(fontdir/'DejaVuSans-Bold.ttf'),88);small=ImageFont.truetype(str(fontdir/'DejaVuSans.ttf'),26)
im=Image.new('RGB',(1200,630),'#fdfdfb');d=ImageDraw.Draw(im)
for x in range(10,1200,22):
 for y in range(10,630,22):d.ellipse((x,y,x+1,y+1),fill='#c8c8c8')
d.rounded_rectangle((38,38,1162,592),24,fill='#191919');d.text((89,90),'MIRI',font=f,fill='white');d.text((92,221),'Thoughtful work. A little curiosity.',font=small,fill='#c5c5c5')
d.text((92,473),'An interactive portfolio / PRISM',font=small,fill='#d4dfa8')
im.save(PUBLIC/'images'/'social-card.png',optimize=True)
print('Original assets generated.')

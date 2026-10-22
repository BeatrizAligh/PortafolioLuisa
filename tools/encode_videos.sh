#!/bin/bash
# Re-encodes the source videos in Videos/ into web-ready MP4 (H.264, faststart) + WebP posters.
# usage: bash tools/encode_videos.sh   (skips outputs that already exist)
cd "$(dirname "$0")/.."
SRC=Videos; OUT=media/video; POS=media/poster
mkdir -p "$OUT" "$POS"
enc() { # src dest crf maxW maxrate [extra input args...]
  local src="$1" dst="$2" crf="$3" maxw="$4" rate="$5"; shift 5
  [ -f "$OUT/$dst.mp4" ] && { echo "skip $dst"; return; }
  echo "$(date +%T) encoding $dst"
  ffmpeg -v error -y "$@" -i "$SRC/$src" -map 0:v:0 -map 0:a:0? \
    -vf "scale='min($maxw,iw)':-2:flags=lanczos,format=yuv420p" \
    -c:v libx264 -preset slow -crf "$crf" -maxrate "$rate" -bufsize "$((${rate%M}*2))M" -profile:v high \
    -c:a aac -b:a 96k -ac 2 -movflags +faststart "$OUT/$dst.tmp.mp4" && mv "$OUT/$dst.tmp.mp4" "$OUT/$dst.mp4"
  poster "$dst"
}
poster() {
  [ -f "$POS/$1.webp" ] && return
  local d; d=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT/$1.mp4")
  local t; t=$(python -c "print(min(2.5, float('$d')*0.3))")
  ffmpeg -v error -y -ss "$t" -i "$OUT/$1.mp4" -frames:v 1 -vf "scale='min(1280,iw)':-2" -c:v libwebp -quality 78 "$POS/$1.webp"
}
# Ilumimochis
enc Ilumimochis_Trailer.mp4 mochis-trailer 27 1920 4M
enc Ilumimochis_03_MochiBatallas.mp4 mochis-batallas 28 1920 3M
enc Ilumimochis_04_MochiPoderes.mp4 mochis-poderes 28 1920 3M
enc Ilumimochis_07_Coleccion_Premios.mp4 mochis-coleccion-premios 28 1920 3M
enc Ilumimochis_02_Tutorial_Mazos.mp4 mochis-tutorial-mazos 28 1920 3M
enc Ilumimochis_08_Gameplay_General.mp4 mochis-gameplay-general 27 1920 4M
enc Ilumimochis_01_Login_Tutorial_Navegacion.mp4 mochis-login-navegacion 28 1920 3M
enc Ilumimochis_05_Perfil_Estadisticas_Personalizacion.mp4 mochis-perfil-estadisticas 28 1920 3M
enc Ilumimochis_06_Organizacion_de_Mazos.mp4 mochis-organizacion-mazos 28 1920 3M
# Magic Birthday
enc MagicBirthday_trailer.mp4 magic-trailer 27 1920 4M
enc 02_celular_edit.mp4 magic-dos-dispositivos 28 1080 3M
enc 03_texturas_pc_edit.mp4 magic-eventos-dinamicos 28 1920 3M
enc 04_comunicacion_edit.mp4 magic-comunicacion-telefono 28 1920 3M
enc 05_notas_edit.mp4 magic-interaccion-dispositivo 28 1920 3M
enc 01_gameplay_pc_edit.mp4 magic-gameplay-general 27 1920 4M
# AR Dev
enc HP-Printer.mp4 ar-hp-printer 26 720 2M
enc "ClaroGeneral Face and Hand.mp4" ar-claro-hand 26 720 2M -t 54.2
enc "ClaroGeneral Face and Hand.mp4" ar-claro-face 26 720 2M -ss 54.3
enc Cocacola-Selector.mp4 ar-cocacola-selector 26 720 2M
enc dodge.mp4 ar-dodge 28 720 1M
enc NYX.mp4 ar-nyx 28 720 1M
enc movistarexperience.mp4 ar-movistar 28 720 1M
enc Todinnito.mp4 ar-todinnito 27 720 2M
# Web Dev
enc Windmar.mp4 web-windmar 27 1280 2M
enc FlameCompany_demo.mp4 web-flame-company 27 1440 2M
enc DardranightWeb_demo.mp4 web-dardranight 27 1440 2M
enc AudiChat_demo.mp4 web-audi-chatbot 27 900 1M
# Added 2026-10-22
# OffShore is a browser capture: crop to the game viewport (shown pixelated by CSS)
encoff() { [ -f "$OUT/unity-offshore.mp4" ] && return; ffmpeg -v error -y -i "$SRC/OFFShore.mp4" -vf "crop=640:400:335:157,format=yuv420p" -c:v libx264 -preset slow -crf 21 -maxrate 2M -bufsize 4M -c:a aac -b:a 96k -movflags +faststart "$OUT/unity-offshore.mp4"; poster unity-offshore; }
encoff
enc ElektraMotos_demo.mp4 web-elektra 27 1440 2M
enc nutririndes.mp4 ar-nutririndes 28 720 1M
# BomberWoman (recorded and edited from the Unity project: D:/Dardranight/Portafolio_videos/Bomberman/final)

for n in 00-trailer 01-movimiento 02-bombas 03-enemigos 04-animaciones 05-gestion 06-transiciones 07-potenciadores 08-gameplay; do
  SRC_SAVE=$SRC; SRC=/d/Dardranight/Portafolio_videos/Bomberman/final; enc $n.mp4 bomber-${n#*-} 26 1920 3M; SRC=$SRC_SAVE
done
# El último ensayo (recorded and edited from the Unity project: D:/Dardranight/Portafolio_videos/UltimoEnsayo/final)
for n in 00-trailer 01-mecanicas 02-gameplay; do
  SRC_SAVE=$SRC; SRC=/d/Dardranight/Portafolio_videos/UltimoEnsayo/final; enc $n.mp4 ultimo-${n#*-} 26 1920 3M; SRC=$SRC_SAVE
done
echo "$(date +%T) done"; du -sh "$OUT" "$POS"

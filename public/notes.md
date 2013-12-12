# Notes and/or References

## ffmpeg // node.js // video stream

Monday, December 9, 10:04 PM

src:
http://www.html5rocks.com/en/tutorials/video/basics/
http://diveintohtml5.info/video.html#webm-cli

Convert mp4 file to webm in two steps:

`ffmpeg -pass 1 -passlogfile sample.mp4 -threads 16 -keyint_min 0 -g 250 -skip_threshold 0 -qmin 1 -qmax 51 -i sample.mp4 -vcodec libvpx -b 614400 -s 320x240 -aspect 16:9 -an test.webm`

`ffmpeg -pass 2 -passlogfile sample.mp4 -threads 16 -keyint_min 0 -g 250 -skip_threshold 0 -qmin 1 -qmax 51 -i sample.mp4 -vcodec libvpx -b 614400 -s 320x240 -aspect 16:9 -an test.webm`


## Stream webcam to http/file via vlc
goto: media > stream
src: http://www.makeuseof.com/tag/7-top-secret-features-free-vlc-media-player-si/


## How to capture webcam input via ffmpeg
https://trac.ffmpeg.org/wiki/How%20to%20capture%20a%20webcam%20input


# Capture from webcam, transcode it to webm
`ffmpeg -f video4linux2 -r 25 -s 640x480 -i /dev/video0 -vcodec libvpx -an out.webm`


# More docs on ffmpeg:
http://sonnati.wordpress.com/2011/08/30/ffmpeg-%E2%80%93-the-swiss-army-knife-of-internet-streaming-%E2%80%93-part-iv/

https://trac.ffmpeg.org/wiki/StreamingGuide

http://www.catswhocode.com/blog/19-ffmpeg-commands-for-all-needs

# Transcoding, transrating
http://www.streamingmedia.com/Articles/Editorial/What-Is-.../What-is-Encoding-and-Transcoding-75025.aspx

# Realtime screencast to html5 <video> using ffmpeg and node.js
http://granular.cs.umu.se/browserphysics/?p=2287

# Transcode avi (mp4) file to webm
`ffmpeg -pass 1 -passlogfile pilot.avi -threads 16 -keyint_min 0 -g 250 -skip_threshold 0 -qmin 1 -qmax 51 -i pilot.avi -vcodec libvpx -acodec libvorbis pilot-audio1.webm`

`ffmpeg -pass 2 -passlogfile pilot.avi -threads 16 -keyint_min 0 -g 250 -skip_threshold 0 -qmin 1 -qmax 51 -i pilot.avi -vcodec libvpx -acodec libvorbis pilot-audio1.webm`



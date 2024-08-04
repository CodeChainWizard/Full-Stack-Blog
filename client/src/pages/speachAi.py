import pyttsx3

# Initialize the TTS engine
engine = pyttsx3.init()

# Set the rate at which the text should be spoken
rate = engine.getProperty('rate')
engine.setProperty('rate', rate-50)

# Set the volume of the spoken text
volume = engine.getProperty('volume')
engine.setProperty('volume', volume+0.25)

# Set the voice to use
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[1].id)

# Set the text to be spoken
text = "Hello, this is a test of the text-to-speech system using pyttsx3."

# Save the spoken text to an audio file
engine.save_to_file(text, 'output.mp3')

# Disconnect the TTS engine
engine.stop()



from gtts import gTTS
from playsound import playsound

# Set the text to be spoken
text = "Hello, this is a test of the text-to-speech system using gTTS."

# Create the TTS object
tts = gTTS(text)

# Save the audio file
tts.save("hello.mp3")

# Play the audio file
playsound("hello.mp3")


# Get a list of available voices
voices = engine.getProperty('voices')

# Set the voice to use
engine.setProperty('voice', voices[1].id)


# Get the current pitch
pitch = engine.getProperty('pitch')
# Get the current volume
volume = engine.getProperty('volume')

# Set the pitch to a higher value
engine.setProperty('pitch', pitch+0.5)
# Set the volume to a higher value
engine.setProperty('volume', volume+0.25)
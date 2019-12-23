const speech = require('@google-cloud/speech')
const fs = require('fs')

async function main(){
    const client=new speech.SpeechClient();
    const filename = './resources/lmao.wav'
    const file =fs.readFileSync(filename);
    const audioBytes =file.toString('base64');
    const audio = {
        content: audioBytes
    };
    const config= {
        languageCode: 'en-US',
        model: 'default',
        alternativeLanguageCodes: [`en-IN`, `en-GB`],
        profanityFilter: false,
        enableWordTimeOffsets: true,
        encoding:'LINEAR16',

    }
    const request={
        audio: audio,
        config: config
    }
    const [response]  = await client.recognize(request)
    const transcription = response.results.map(result=>
            result.alternatives[0].transcript
        ).join('\n');
        console.log(`Transcription: ${transcription}`)
}
main().catch(console.error)
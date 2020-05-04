import axios from 'axios'
const apiKey = 'AIzaSyC9Sbq0Yi4QIrTt0rbRXuhfKIEsQ7p5HpA'

const memoized = {}

export default {
    getVideo: videoId => memoized[videoId] ? new Promise.resolve(memoized[videoId]) :
        axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${apiKey}`, )
            .then(res => res.data)
            .then(data => {
                memoized[videoId] = data
                return data
            })
            .catch(e => console.log(e.response))
}

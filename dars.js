search.onkeyup = async (event) => {
    try {
        if(event.keyCode == 13){
            let response = await fetch('https://api.quran.sutanlab.id/surah/' + search.value)
            let surah = await response.json()
            res.innerHTML = null
        for(let i = 0; i < surah.data.verses.length; i++){
            let li=document.createElement('li')
            let audio = document.createElement('audio')
            audio.controls = false
            let source = document.createElement('source')
            source.src = surah.data.verses[i].audio.primary
            li.textContent = surah.data.verses[i].text.arab
            heder.textContent = `sura: ${surah.data.name.transliteration.en}`
            num.textContent = `${surah.data.numberOfVerses} ayat`
            res.append(li)
            audio.append(source)
            li.onclick = () => {
                wrapper.innerHTML=null
                wrapper.append(audio)
                audio.play()
            }
        }
        let index = 0
        function readQuran(index){
            wrapper.innerHTML = null
            let actives = document.querySelectorAll('.active')
            actives.forEach(el => el.classList.remove('active'))
            let items = document.querySelectorAll('li')
            items[index].classList.add('active')
            items[index].style.color = "green";
            let audio = document.createElement('audio')
            let source = document.createElement('source')
            source.src = surah.data.verses[index].audio.primary
            audio.append(source)
            wrapper.append(audio)
            audio.play()
            audio.onended = () => {
            if(index < surah.data.verses.length){
                items[index].style.color = 'black'
                return readQuran(index + 1)
            }
        }
    }
        read.onclick = () => {
            let li = document.querySelectorAll('li')
            li.forEach(li => {
                li.style.color = 'black'
            })
            readQuran(index)
        }
    }
    }catch(err){
      console.log(err);
    }
}





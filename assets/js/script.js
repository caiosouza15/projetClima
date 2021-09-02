document.querySelector('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault(); //previne o comportamento padrão do formulario

    let input = document.querySelector('#searchInput').value;

    if(input !== ''){ //testando se o input esta vazio
        clearInfor();
        showWarning('Carregando...');

        let url= `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=b1c67752e9df65ea73a3544e11ef7b57&units=metric&lang=pt_br`; //Setando url de consulta
        
        let results = await fetch(url); //fazendo a consulta e armazenando
        let json = await results.json(); //transformando o resultado em obj js

        if(json.cod === 200){ //Verificando se houve uma busca valida
            showInfo({ //Montando o obj para ser enviado a função
                //info
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                //infoTemp
                temp_min: json.main_temp_min,
                temp_max: json.main.temp_max,
                feels_like: json.main.feels_like,
                //vento
                tempIcon: json.weather[0].icon,
                description: json.weather[0].description,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        } else{
            clearInfor();
            showWarning('Hm... Vamos ficar te devendo essa. Não encontramos esta localização!');
        }
    }
});

function showInfo(json){ 
    showWarning('');    

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>C°</sup>`;
    document.querySelector('.descricao').innerHTML = `${json.description} `;

    document.querySelector('.feelslikeInfo').innerHTML = `${json.feels_like} <sup>ºC</sup>`;
    

    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;
    document.querySelector('.resultado').style.display = 'block';
}

function clearInfor(){ //limpar infos para um novo resultado
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}
function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg;
}
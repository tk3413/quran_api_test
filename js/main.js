$(document).ready(function(){
    console.log("Working");

    var Times = {
        fajr: [],
        sunrise: [],
        dhuhr: [],
        asr: [],
        maghreb: [],
        isha: []

    };

    let getTimes = function(month, day, year){
        $.ajax({
            type: 'GET',
            url: `http://api.aladhan.com/v1/calendarByAddress?address=7902%20Tysons%20One%20Place%20McLean%20VA&method=2&month=${month}&year=${year}`,
            dataType: 'json'

        }).then(function (response){
            for(var i = 0; i < response.data.length; i++){
            // console.log(response);
            var date = response.data[i].date.readable;
            var times = response.data[i].timings;
            Times.fajr.push(times.Fajr);
            Times.sunrise.push(times.Sunrise);
            Times.dhuhr.push(times.Dhuhr);
            Times.asr.push(times.Asr);
            Times.maghreb.push(times.Sunset);
            Times.isha.push(times.Isha);

            }// for

            console.log(`Salat times for ${month}/${day}/${year}`);
            printTime(day);
        });// then


    }// getTimes();

    let getAyat = function(ayatNumber){
        $.ajax({
            type: 'GET',
            url: `http://api.alquran.cloud/ayah/${ayatNumber}`,
            dataType: 'json'

        }).then(function (response){
            console.log(`Surah: ${response.data.surah.englishName}`);
            console.log(response.data.text);

        });// then

    }// getAyat();

    var getToday = function(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();
        if(dd<10) {
            dd = '0'+dd
        }

        if(mm<10) {
            mm = '0'+mm
        }

        today = mm + '/' + dd + '/' + yyyy;
        // console.log(today);
        getTimes(mm, dd, yyyy);
        return today;
    }// getToday();

    var randomNumberGenerator = function(){
        return Math.floor(Math.random() * 6236);

    }

    var printTime = function(date){
        for(waqt in Times){
            console.log(`${waqt}: ${Times[waqt][date]}`);
        }
    }// printTime();

    getToday();
    getAyat(randomNumberGenerator());

});

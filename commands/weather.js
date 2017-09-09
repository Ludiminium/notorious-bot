const http = require('http');
const weather = require('../util/weather');
const Discord = require('discord.js');
exports.run = (client, message, args, argresult)	=> {
			var request = http.get('http://api.openweathermap.org/data/2.5/weather?q=' + argresult + '&appid=95dcf7b6a21897a585ce210222415fee&units=metric', function(response) {
			var body = '';
				response.on('data', function(chunk) {
					body += chunk;
				});
				response.on('end', function() {
					if (response.statusCode === 200) {
						try{
							var weatherAPI = JSON.parse(body);
							printWeather(weatherAPI.name, weatherAPI.main.temp, weatherAPI.wind.speed, weatherAPI.weather[0].icon, weatherAPI.sys.country, weatherAPI.weather[0].main, weatherAPI.weather[0].description);
							printDirection(weatherAPI.wind.deg);
						} catch(error) {
							printError(error);
						}
					}	else {
						console.log('Couldnt find the weather from: **' + argresult + '** Error code: (' + http.STATUS_CODES[response.statusCode] + ')');
						if (!argresult){
							message.reply('Please give a city as input')
						} else message.reply(`Couldn't find the weather of: ${argresult}, please try an other input`)
					}
				});
			});
			request.on('error', function (err) {
				console.log(chalk.red(`Weather failed to execute\n${err.stack}`));
			});



			function printDirection(degree){
	  		if(degree>337.5) return 'North';
	  		if(degree>292.5) return 'North West';
	  		if(degree>247.5) return 'West';
	  		if(degree>202.5) return 'South West';
	  		if(degree>157.5) return 'South';
	  		if(degree>122.5) return 'South East';
	  		if(degree>67.5) return 'East';
	  		if(degree>22.5)return 'North East';
	  		return 'North';
	  	}

	  	function printError (error) {
	  		console.error(error.message);
	  	}

			function printWeather(argresult, temp, windspeed, png, country, main, description, degree) {
		    const embed = new Discord.RichEmbed()
		    .setColor(0x00AE86)
		    .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL)
		    .setTimestamp()
		    .setThumbnail("http://openweathermap.org/img/w/" + png + ".png")
		    .setDescription("**Temperature** \n" + temp + "�C\n\n**Wind speed** \n" + windspeed + "km/h \n\n**Wind Direction** \n" + printDirection(degree) + "\n\n**Weather condition** \n" + main + ", " + description + "\n\n")
		    .setTitle("**Weather in " + argresult + ", " + country + "**");
		    message.channel.send({embed});
		  }
};

var WebSocketClient = require('websocket').client;
var ws = new WebSocketClient();
var vm = '20.106.78.32:6007';
var pass = "collabvm";
var prefix = "c!";
var name = "BotTest5678 c!help";
    

function connect(){
    ws.on('connect', function(f){
      function send(string){
        f.sendUTF(encodeCommand(['chat', string]));
      }
      function changeUsername(string){
        f.sendUTF('6.rename,' + string.length + '.' + string + ';');
      }
      f.on('message',function(message){
        var cmd = decodeCommand(message.utf8Data);
        changeUsername(name);
        var username = cmd[1];
        var command = cmd[2];
        
        f.sendUTF(encodeCommand(['admin', '2', pass]));

        if (command == prefix + "help"){
            send("https://github.com/imightexist/bettervmbot-cmds/blob/main/README.md")
        }
        if (command == prefix + "cd1"){
            f.sendUTF(encodeCommand(['admin','5','vm7','change ide1-cd0 /isos/cd1.iso']));
        }
        if (command == prefix + "cd2"){
            f.sendUTF(encodeCommand(['admin','5','vm7','change ide1-cd0 /isos/cd2.iso']));
        }
        if (command == prefix + "eject"){
            f.sendUTF(encodeCommand(['admin','5','vm7','eject -f ide1-cd0']));
        }
        if (command == prefix + "cert"){
            send('Download from bettervm.glitch.me/admin/CA.crt');
        }
        if (command == prefix + "bootset c"){
            f.sendUTF(encodeCommand(['admin','5','vm7','boot_set c']));
        }
        if (command == prefix + "bootset d"){
            f.sendUTF(encodeCommand(['admin','5','vm7','boot_set d']));
        }
        if (command == prefix + "bootset a"){
            f.sendUTF(encodeCommand(['admin','5','vm7','boot_set a']));
        }
        if (command == prefix + "bootset n"){
            f.sendUTF(encodeCommand(['admin','5','vm7','boot_set n']));
        }

        setInterval(function(){
            if (f.connected){
                f.sendUTF('3.nop;');
            }
        },2500);
      })
    })
    ws.connect('ws://' + vm, 'guacamole');
  }
  function decodeCommand(c) {
      var sections = [];
      var bump = 0;
      while (sections.length <= 50 && c.length >= bump) {
          var current = c.substring(bump);
          var length = parseInt(current.substring(current.search(/\./) - 2));
          var paramater = current.substring(length.toString().length + 1, Math.floor(length / 10) + 2 + length);
          sections[sections.length] = paramater;
          bump += Math.floor(length / 10) + 3 + length;
      }
      sections[sections.length - 1] = sections[sections.length - 1].substring(0, sections[sections.length - 1].length - 1);
      return sections;
  }
  function encodeCommand(c) {
      var command = "";
      for (var i = 0; i < c.length; i++) {
          var current = c[i];
          command += current.length + "." + current;
          command += (i < c.length - 1 ? "," : ";");
      }
      return command;
  }
  connect();
  

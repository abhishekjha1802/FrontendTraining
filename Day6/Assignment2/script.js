var timer_instances = 0;
var timers = [];

class Timer {
   constructor(hour, minute, second, timerID) {
        this.hour = hour;
        this.minute = minute;
        this.second = second;
        this.intervalID = null;
        this.timerId = timerID;
        this.running = false;
    }
    start() {
        if ( this.running == false)
        {
            this.intervalID = setInterval(() => {
                console.log(this.timerId)
                this.running = true;
                document
                    .getElementById(this.timerId)
                    .getElementsByTagName("span")[2].innerHTML =
                    this.second > 10 ? --this.second : "0" + --this.second;

                if(this.second<10)
                {
                    document.getElementById(this.timerId).style.color="red";
                }

                if (this.second == 0) 
                    clearInterval(this.intervalID);
            }, 1000);
        }
        else console.log("timer already running");
    }    
    
    stop() {
        document
        .getElementById(this.timerId).remove();

        document
        .getElementById(this.timerId+"control").remove();
        
        console.log(this.timerId+"control")
    }
    pause() {
        this.running = false;
        clearInterval(this.intervalID);
    }

    reset(){
        clearInterval(this.intervalID);
        this.running = false;
        this.second = 59;
        document.getElementById(this.timerId).getElementsByTagName("span")[2].innerHTML = this.second;
    }
}

function add_timer_instace() {
    let hour = "00";
    let minute = "00";
    let second = "59";
    console.log("timer" + `${timer_instances.toString()}`);

    temp_HTML =
        ` <div id= "timer` +
        timer_instances +
        `" class="timer ">
       <span class="hour">` +
        hour +
        `</span>:<span class="minute">` +
        minute +
        `</span>:<span
           class="second">` +
        second +
        `</span>
       </div> `;

    temp_control_html =
        `  <div class="control" id="timer${timer_instances}control" style="margin-bottom:16px;">
       <button id = "` +
        timer_instances +
        `" onClick= "start(this.id) ">Start</button>
       <button id = "` +
        timer_instances +
        `" onClick= "stop(this.id)">Stop</button>
       <button id = "` +
        timer_instances +
        `" onClick= "pause(this.id)">Pause</button>
       <button id = "` +
        timer_instances +
        `" onClick= "reset(this.id)">Reset</button>
     </div> `;

    console.log(
        "add_timer_instance called and number of instances are " + timer_instances
    );

    document.getElementById("timer-space").innerHTML +=
        temp_HTML + temp_control_html;

    var local_timer = new Timer(
        hour,
        minute,
        second,
        "timer" + `${timer_instances.toString()}`
    );
    timers.push(local_timer);
    timer_instances++;
}

function start(index) {
    console.log(timers);
    timers[index].start();
    console.log("start called and index is " + index);
}
function stop(index) {
    timers[index].stop();
    console.log("Stop called and index is " + index);
}
function pause(index) {
    timers[index].pause();
    console.log("pause called and index is " + index);
}

function reset(index) {
    timers[index].reset();
}
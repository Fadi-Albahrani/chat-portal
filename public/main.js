var socket = io();
(function () {

    $("form").submit(function (e) {
        let li = document.createElement("li");
        e.preventDefault(); // prevents page reloading
        socket.emit("chat message", $("#message").val());

        messages.appendChild(li).append($("#message").val());
        let span = document.createElement("span");
        messages.appendChild(span).append("by " + "Anonymous" + ": " + "just now");
        $("#message").val("");
        return false;
    });
})();

(function () {
    fetch("/chats")
        .then(data => {
            return data.json();
        })
        .then(json => {
            json.map(data => {

                let li = document.createElement("li");
                let messages = document.getElementById("messages")
                let span = document.createElement("span");
                messages.appendChild(li).append(data.message);

                messages
                    .appendChild(span)
                    .append("by " + data.sender);
            });
        });
})();


(function () {
    socket.on("received", data => {
        console.log("recived message");
        let li = document.createElement("li");
        let span = document.createElement("span");
        var messages = document.getElementById("messages");
        messages.appendChild(li).append(data.message);
        li.style.backgroundColor = "blue";
        messages.appendChild(span).append("by " + "anonymous");
    });
})();
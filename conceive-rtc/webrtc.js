/** RtcEntityConnection primarily is used for sending single files, text, video and audio
 *  @author Supratik Chatterjee
 */
class RtcEntityConnection {
    rtcConf;

    username;

    wsConf;
    wsConn;
    static onWsOpen = function (evt) { console.warn("onWsOpen not overridden"); console.log(evt); };
    static onWsErr = function (evt) { console.warn("onWsErr not overridden"); console.error(new Error("Ran into an error in the WebSocket connection", evt)); };
    static onWsMsg = function (evt) { console.warn("onWsMsg not overridden"); console.log(evt); }

    constructor(username, wsConf, rtcConf) {
        // Use this scope to initialize rtc_conf and media requests
        this.username = username;
        this.wsConf = wsConf;
        this.rtcConf = rtcConf;
        // Initialize WebSocket to server, reinit not required
        if (this.wsConn == null) {
            this.wsConn = new WebSocket(wsConf.url, "json");
            this.wsConn.onopen = function (evt) { RtcEntityConnection.onWsOpen(evt); }
            this.wsConn.onerror = function (evt) { RtcEntityConnection.onWsErr(evt); }
            this.wsConn.onmessage = function (evt) { RtcEntityConnection.onWsMsg(evt); }
        }

    }
    static loopback(data) {
        var dataJson = JSON.stringify(data);
        RtcEntityConnection.wsConn.send(dataJson);
    }
    static connect(targetUsername) {
        const peerConn = new RTCPeerConnection(RtcEntityConnection.rtc_conf);

        peerConn.onicecandidate = handleIceCandidate;
        peerConn.oniceconnectionstatechange = handleIceConnectionStateChange;
        peerConn.onicegatheringstatechange = handleIceGatheringStateChange;
        peerConn.onsignalingstatechange = handleIceSignalingStateChange;
        peerConn.onnegotiationneeded = handleIceNegotiationNeeded;
        peerConn.ontrack = trackIce;

        function handleIceCandidate(event) {
            if (event.candidate)
                RtcEntityConnection.loopback({
                    type: "new-ice-candidate",
                    target: targetUsername,
                    candidate: event.candidate
                });
        }


        function handleIceConnectionStateChange(event) {
            log("*** ICE connection state changed to " + peerConn.iceConnectionState);
            switch (peerConn.iceConnectionState) {
                case "closed":
                case "failed":
                case "disconnected":
                    // closeVideoCall();
                    peerConn.ontrack = null;
                    peerConn.onicecandidate = null;
                    peerConn.oniceconnectionstatechange = null;
                    peerConn.onsignalingstatechange = null;
                    peerConn.onicegatheringstatechange = null;
                    peerConn.onnegotiationneeded = null;
                    // Stop all transceivers on the connection

                    peerConn.getTransceivers().forEach(transceiver => {
                        transceiver.stop();
                    });

                    peerConn.close();
                    peerConn = null;
                    break;
            }
        }

        function handleIceGatheringStateChange(event) {
            log("ICE gathering state changed to: " + peerConn.iceGatheringState);
        }

        function handleIceSignalingStateChange(event) {
            log("WebRTC signaling state changed to: " + peerConn.signalingState);
            switch (peerConn.signalingState) {
                case "closed":
                    closeVideoCall();
                    break;
            }
        }

        async function handleIceNegotiationNeeded() {
            try {
                const offer = await peerConn.createOffer();
                // If the connection hasn't yet achieved the "stable" state,
                // return to the caller. Another negotiationneeded event
                // will be fired when the state stabilizes.
                if (peerConn.signalingState != "stable") {
                    return;
                }
                // Establish the offer as the local peer's current
                // description.
                await peerConn.setLocalDescription(offer);
                // Send the offer to the remote peer.
                RtcEntityConnection.loopback({
                    name: myUsername,
                    target: targetUsername,
                    type: "video-offer",
                    sdp: peerConn.localDescription
                });
            } catch (err) {
                console.error(err);
            };
        }

        function trackIce(event) {
            // document.getElementById("received_video").srcObject = event.streams[0];
            // document.getElementById("hangup-button").disabled = false;
        }
    }

    // _test() {
    //     console.log("RTC Config : " + RtcEntityConnection.rtc_conf);
    //     console.log("WS : " + RtcEntityConnection.wsConn);
    //     console.log(this.username);
    // }
    // send(users, message) {
    //     if (typeof users === 'string' || users instanceof String) {
    //         users = [users];
    //     }
    //     if (!(users instanceof Array)) {
    //         console.error("Invalid users entry");
    //         console.error(typeof users);
    //         return;
    //     }
    //     let time = new Date();
    //     let utcSeconds = (x.getTime() + x.getTimezoneOffset() * 60 * 1000) / 1000;
    //     users.forEach((user, index, arr) => {
    //         RtcEntityConnection.loopback({ type: 'message', time: utcSeconds, from: this.username, to: user, message: message });
    //     });
    // }
}
console.log("Hola from the RTC library.");
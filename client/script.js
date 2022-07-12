const button = document.getElementById('btn');
options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        item: {
            id: "price_1L2wp5K2amf6QPecpdHz373C",
            quantity: 2
        },
    }),
};

if (button) {
    button.addEventListener("click", () => {
        fetch("http://localhost:9000/charge", options)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then((json) => Promise.reject(json));
                }
            })
            .then(({ url }) => {
                window.location = url;
            })
            .catch((e) => {
                console.log(e.error);
            });
    });
} else {
    console.log("No button");
}

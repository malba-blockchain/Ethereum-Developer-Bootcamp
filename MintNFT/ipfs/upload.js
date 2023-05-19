async function run() {
    const { create } = await import('ipfs-http-client');
    const ipfs = await create();
    
    // we added three attributes, add as many as you want!
    const metadata = {
        path: '/',
        content: JSON.stringify({
            name: "My First NFT",
            attributes: [
            {
                "trait_type": "Perspicacity",
                "value": "100" 
            },
            {
                "trait_type": "Indefatigability",
                "value": "100"
            },
            {
                "trait_type": "Success",
                "value": "100"
            },
            {
                "trait_type": "Relentlessness",
                "value": "100"
            },
            {
                "trait_type": "Speed",
                "value": "100"
            },
            {
                "trait_type": "Baller",
                "value": "100"
            }
            ],
            // update the IPFS CID to be your image CID
            image: "QmRfpgF1vXokBUynvBtKHJLaJdMmrphTEu5zXNR8EAPxAm",
            description: "So much PLW3!"
        })
    };

    const result = await ipfs.add(metadata);
    console.log(result);

    process.exit(0);
}

run();
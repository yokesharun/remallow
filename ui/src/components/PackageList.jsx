import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactJson from 'react-json-view';

const PackageList  = () => {

    const [packages, setPackages] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [packageName, setPackageName] = useState('');

    useEffect(() => {
        getPackage();
    }, []);

    const getPackage = () => {
        axios.get('http://127.0.0.1:8081/package')
        .then(function (response) {
            // handle success
            setPackages(JSON.parse(response.data));
            setIsLoaded(true);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    }

    const installPackage = () => {
        if(packageName !== ''){
            axios.get('http://127.0.0.1:8081/package/'+packageName)
            .then(function (response) {
                // handle success
                // setPackages(JSON.parse(response.data));
                // setIsLoaded(true);
                if(response.data.result === 'ok'){
                    getPackage();
                }
                setPackageName('');
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
        }
    }

    if(isLoaded){
    return (
        <>
            <div>
                <h1>Remallow Package Manager</h1>
                <button onClick={() => getPackage()}>Update</button>
                <input type="text" onChange={(e) => setPackageName(e.target.value)} value={packageName}/>
                <button onClick={() => installPackage()}>Install</button>
                <ReactJson src={packages} displayDataTypes={false} enableClipboard={false} />
            </div>
        </>
    );
}
 return null;
}

export default PackageList;
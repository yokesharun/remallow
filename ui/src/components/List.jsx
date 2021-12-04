import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactJson from 'react-json-view';

const List = () => {

    const [packages, setPackages] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [packageName, setPackageName] = useState('');

    useEffect(() => {
        getPackage();
    }, []);

    const getPackage = () => {
        axios.get('http://127.0.0.1:8081/package', {
            mode: 'no-cors',
        })
        .then(function (response) {
            // handle success
            setPackages(response.data);
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

    const RemovePackage = (i) => {
        if(i !== ''){
            axios.get('http://127.0.0.1:8081/package/remove/'+i)
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

    const obj = {
        ...packages.json,
    }

    const newObj = {
        ...obj,
        dependencies: {
            ...obj.dependencies
        }
    }

    const listOfPackages = Object.keys(newObj.dependencies);

    const renderPackages = (listOfPackages) => {
        return listOfPackages.map((item) => 
            <div class="column is-one-third">
                <div className="tile is-child box item-wrapper">
                    <div>
                        <p className="title is-size-6">{item}</p> 
                        <div className="control">
                            <div className="tags has-addons">
                            <span className="tag is-primary">version</span>
                            <span className="tag is-light">0.9.3</span>
                            </div>
                        </div>
                    </div>
                    <div className="half">
                        <button className="button is-danger is-outlined is-small" onClick={() => RemovePackage(item)} title="Uninstall">
                            <span className="icon is-small">
                                <i className="fas fa-trash-alt"></i>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <section className="section is-small">
                <h1 className="title is-size-4">NPM Package Manager</h1>
                <h6 className="subtitle is-size-7">
                    A simple tool to manager your <strong>package.json</strong> file.
                </h6>
                <input className="input is-primary" type="text" placeholder="Search your packages here" onChange={(e) => setPackageName(e.target.value)} value={packageName} />
                <button class="button is-primary list-items" onClick={() => installPackage()}>Install Package</button>
            </section>
            <section className="section">
                <h1 className="title is-size-5">Installed Packages ()</h1>
                <h6 className="subtitle is-size-7">
                    Packages listed here are fetched from your Package.json file.
                </h6>
                <div class="columns is-multiline is-mobile list-items">
                {isLoaded && renderPackages(listOfPackages)}
                </div>
            </section>
        </div>
    );
}

export default List;
import React, { useEffect } from 'react';

const PackageList  = () => {

    useEffect(() => {
        fetch('http://127.0.0.1:8081/package')
        .then((res) => res.json())
        .then(
          (result) => {
              console.log(result)
          }
        );
    });

    return <h1>j</h1>;
}

export default PackageList;
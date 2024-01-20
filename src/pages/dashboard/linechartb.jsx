import React, { useState, useEffect, useContext } from 'react';
import Chart from 'react-apexcharts';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';

const LineChartB = () => {
  const [product, setProduct] = useState([]);
  const [csvFile, setCsvFile] = useState(null);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, [currentUser.uid]);

  const fetchData = async () => {
    try {
      const userDocQuery = query(collection(db, 'users'), where('uid', '==', currentUser.uid));
      const querySnapshot = await getDocs(userDocQuery);

      const userData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.startupDetails && data.startupDetails['T']) {
          userData.push({
            name: 'T',
            data: data.startupDetails['T'].map(Number),
          });
        }
        else if (data.startupDetails && data.startupDetails['T-shirt']) {
          userData.push({
            name: 'T-shirt',
            data: data.startupDetails['T-shirt'].map(Number),
          });
        }
      });

      setProduct(userData);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const processData = async () => {
    if (csvFile) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target.result;
        const lines = text.split('\n');
        const parsedData = lines
          .slice(1) // Skip header row
          .map((line) => {
            const [time, revenue] = line.split(',').map(Number);
            return revenue;
          });

        if (parsedData) {
          try {
            const userRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userRef, {
              'startupDetails.T': parsedData,
            });
            fetchData(); // Refresh chart data after update
          } catch (error) {
            console.error('Error updating data: ', error);
          }
        }
      };
      reader.readAsText(csvFile);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCsvFile(file);
    }
  };

  const options = {
    title: {
      text: "Product sell in 2021",
      style: {
        color: '#ffffff', // Set the color for the title
      },
    },
    xaxis: {
      title: {
        text: "Product Sell in Months",
        style: {
          color: '#ffffff', // Set the color for the x-axis title
        },
      },
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: {
        style: {
          colors: '#ffffff', // Set the color for the x-axis labels
        },
      },
    },
    yaxis: {
      title: {
        text: "Product in K",
        style: {
          color: '#ffffff', // Set the color for the y-axis title
        },
      },
      labels: {
        style: {
          colors: '#ffffff', // Set the color for the y-axis labels
        },
      },
    },
    colors: ['#ffffff'],
  };


  return (
    <div className="container-fluid mt-3 mb-3 flex box border border-white p-5 rounded">
    <div className=' flex-1'>
<div className='bg-blue-900 p-5 text-white  text-xl mb-5 rounded'>
    <h2></h2>
    
  <input type="file" accept=".csv" onChange={handleFileUpload} /><br />
  <button onClick={processData} className='bg-sky-100 mt-5 text-black px-4 py-2 rounded'>Upload and Update Data</button>
  </div>
  <Chart type="line" width={600} height={350} series={product} options={options} />
    </div>
  
  
  {/* <Chart type="line" width={600} height={350} series={product} options={options} /> */}
</div>
  );
};

export default LineChartB;

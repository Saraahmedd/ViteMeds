"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '../../../components/Button';

const AdminDashboard = () => {

  const [statPeriod, setStatPeriod] = useState('This Week');
  const [statDataIdx, setStatDataIdx] = useState(0);

  // Dummy patient reports
  const patientReports = [
    {
      patientName: 'Mariam Mahmoud',
      condition: 'Cancelled apointment',
      reportDate: '2023-01-16',
    },
    {
      patientName: 'Abdelrahman Ahmed',
      condition: 'Prescription not visible',
      reportDate: '2023-01-15',
    },
    {
      patientName: 'Maram Haitham',
      condition: 'Connection issues',
      reportDate: '2023-01-14',
    },
  ];

  const totalAppointments = 397;

  const statData = [
    {
      period: "This Week",
      patients: "32",
      doctors: "3",
      appointments: "88",
      geo: [
        {city:"Cairo", patients: "16", appointments: "40"},
        {city:"Giza", patients: "9", appointments: "28"},
        {city:"Alexandria", patients: "7", appointments: "20"},
      ]
    },
    {
      period: "This Month",
      patients: "125",
      doctors: "18",
      appointments: "296",
      geo: [
        {city:"Cairo", patients: "59", appointments: "152"},
        {city:"Giza", patients: "39", appointments: "92"},
        {city:"Alexandria", patients: "27", appointments: "52"},
      ]
    },
    {
      period: "This Year",
      patients: "596",
      doctors: "59",
      appointments: "1,053",
      geo: [
        {city:"Cairo", patients: "298", appointments: "538"},
        {city:"Giza", patients: "167", appointments: "322"},
        {city:"Alexandria", patients: "131", appointments: "193"},
      ]
    }
  ]

  const handleStatPeriod = (e,period) => {
      e.preventDefault();
      setStatPeriod(period);
      for (const [key, data] of Object.entries(statData)) {
        if (data.period === period) {
          setStatDataIdx(key);
          break; // Exit the loop after finding the first match
        }
      }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <main className="col-md-12 ms-sm-auto col-lg-11 px-md-4">
        <h3 className='my-3 mb-5 text-title'>Admin Dashboard</h3>
          <div className="row">
            <div className="col-md-4">
              <div className="card shadow bg-light border-0 mb-4">
                <div className="card-body">
                  <h5 className="card-title text-primary text-bold">Account Information</h5>
                  <hr />
                  <div className="card-text row">
                    <div className='col-md-6 text-semibold global-text my-auto'> 
                    <Image src="/username.svg" width={20} height={20} className=''/> Sara_Ahmed
                    </div>
                    <div className='col-md-6 text-semibold global-text my-auto'>
                    <Image src="/id.svg" width={20} height={20} className='mb-1 me-1'/> XXXX 
                    </div>
                  </div>
                </div>
              </div>
            <div className="row mt-2">
            <div className="">
              <div className="card shadow bg-light border-0 mb-4">
                <div className="card-body">
                <h5 className="card-title text-primary text-bold">Patient Reports</h5>
                <hr />
                  <ul className="list-group border-0 mx-2">
                    {patientReports.map((report, index) => (
                      <li key={index} className={`list-group-item rounded shadow mb-3}`}>
                        <strong>{report.patientName}</strong> - {report.condition}
                        <br />
                        <p className="text-muted">Date: {report.reportDate}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
            </div>
            <div className="col-md-8">
              <div className="card shadow bg-light border-0 mb-2">
                <div className="card-body">
                <h4 className="card-title text-primary text-bold">Statistics Summary</h4>
                <hr />
                <div className='text-semibold text-primary row container justify-content-center'>
                <Button className='col-md-3' variant='md' onClick={(e)=>handleStatPeriod(e,"This Week")} text={"This Week"} color={statPeriod=="This Week"? "" :"dark"}></Button>
                <Button className='col-md-3' variant='md' onClick={(e)=>handleStatPeriod(e,"This Month")} text={"This Month"} color={statPeriod=="This Month"? "" :"dark"}></Button>
                <Button className='col-md-3' variant='md' onClick={(e)=>handleStatPeriod(e,"This Year")} text={"This Year"} color={statPeriod=="This Year"? "" :"dark"}></Button>
                </div>
                  <div className="row p-2 m-2 border bg-white rounded">
                    <div className="col-md-4 d-flex ">
                      <div className='leftline-Bold bg-primary me-2'></div> 
                      <div className=' text-dark text-semibold'>{statData[statDataIdx].patients} New Patients</div>
                    </div>
                    <div className="col-md-4 d-flex ">
                      <div className='leftline-Bold bg-primary me-2'></div>
                      <div className=' text-dark text-semibold'>{statData[statDataIdx].doctors} New Doctors</div>
                    </div>
                    <div className="col-md-4 d-flex ">
                      <div className='leftline-Bold bg-primary me-2'></div>
                      <div className=' text-dark text-semibold'>{statData[statDataIdx].appointments} Appointments</div>
                    </div>
                  </div>
                  <br />
                  <div className="geo-section">
                  <h5 className='px-2 text-semibold text-dark pt-2'>GeoGraphical Analysis</h5>

                  <div className="card m-3">
                    {/* <div className="card-header border-0 bg-light">
                    </div> */}
                    <div className="card-body">
                      <table className="table">
                        <thead >
                          <tr>
                            <th className='text-muted'>#</th>
                            <th className='text-muted border-left'>City</th>
                            <th className='text-muted border-left'>Patients</th>
                            <th className='text-muted border-left'>Appointments</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(statData[statDataIdx].geo).map((city, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{city.city}</td>
                              <td>{city.patients}</td>
                              <td>{city.appointments}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td className='bg-light'></td>
                            <td className='text-semibold text-primary bg-light'>Total Successful Appointments</td>
                            <td className='bg-light'></td>
                            <td className='text-semibold text-primary bg-light'>{statData[statDataIdx].appointments}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;


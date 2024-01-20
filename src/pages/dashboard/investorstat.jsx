import React from 'react';

function InvestorStat() {
  const stats = [
    { id: 1, name: 'Total Money Invested', value: '44 million' },
    { id: 2, name: 'Total Return', value: '119 trillion' },
    { id: 3, name: 'Total Startup', value: '46,000' },
    { id: 4, name: 'Total Connections', value: '46,000' },

  ];

  return (
    <div className="bg-gray-900 py-4 px-5 mt-8 flex justify-center items-center rounded-lg shadow-md">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-4 text-center lg:grid-cols-1">
          {stats.map((stat) => (
            <div key={stat.id} className=" flex flex-col items-center justify-center max-w-xs p-6 bg-blue-500  rounded-lg shadow-lg">
              <dt className="text-base leading-7 text-white">{stat.name}</dt>
              <dd className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

export default InvestorStat;
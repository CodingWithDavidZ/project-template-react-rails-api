import React, { useEffect, useState } from 'react';

function MembersPage({ memberUrl, metricsUrl }) {
  const [userData, setUserData] = useState({ metrics: [] });
  const [removed, setRemoved] = useState(false);

  function handleClick(e) {
    fetch(`${metricsUrl}${e.target.value}`, { method: 'DELETE' });
    setUserData({
      metrics: userData.metrics.filter(
        (metric) => metric.id !== e.target.value
      ),
    });
    setRemoved(true);
  }

  useEffect(() => {
    fetch(`${memberUrl}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      });
  }, [removed]);

  const userMetrics = userData.metrics.map((user) => {
    const created = user.created_at.split('T')[0];
    if (
      !user.neck_size &&
      !user.hips_size &&
      !user.bicep_size &&
      !user.chest_size &&
      !user.calf_size &&
      !user.thigh_size &&
      !user.waist_size &&
      !user.weight_lbs &&
      !user.forearm_size &&
      !user.height_feet
    ) {
      return null;
    } else {
      return (
        <>
          <div className='user_metric_box' id={userData.metrics.id}>
            <ul key={userData.metrics.id} className='metric_ul'>
              {user.neck_size ? (
                <li
                  className='neck'
                  id={`neck${user.id}`}
                  key={`neck ${userData.metrics.id}`}
                >
                  <strong>Neck circumference:</strong> {user.neck_size}in
                </li>
              ) : null}
              {user.chest_size ? (
                <li
                  className='chest'
                  id={`chest${user.id}`}
                  key={`chest ${userData.metrics.id}`}
                >
                  <strong>Chest circumference:</strong> {user.chest_size}in
                </li>
              ) : null}
              {user.waist_size ? (
                <li
                  className='waist'
                  id={user.id}
                  key={`waist${userData.metrics.id}`}
                >
                  <strong>Waist circumference:</strong> {user.waist_size}in
                </li>
              ) : null}
              {user.hip_size ? (
                <li
                  className='hip'
                  id={user.id}
                  key={`hip${userData.metrics.id}`}
                >
                  <strong>Hip circumference:</strong> {user.hip_size}in
                </li>
              ) : null}
              {user.thigh_size ? (
                <li
                  className='thigh'
                  id={user.id}
                  key={`thigh${userData.metrics.id}`}
                >
                  <strong>Thigh circumference:</strong> {user.thigh_size}in
                </li>
              ) : null}
              {user.calf_size ? (
                <li
                  className='calf'
                  id={user.id}
                  key={`calf${userData.metrics.id}`}
                >
                  <strong>Calf circumference:</strong> {user.calf_size}in
                </li>
              ) : null}
              {user.bicep_size ? (
                <li
                  className='bicep'
                  id={user.id}
                  key={`bicep${userData.metrics.id}`}
                >
                  <strong>Bicep circumference:</strong> {user.bicep_size}in
                </li>
              ) : null}
              {user.forearm_size ? (
                <li
                  className='forearm'
                  id={user.id}
                  key={`forearm${userData.metrics.id}`}
                >
                  <strong>Forearm circumference:</strong> {user.forearm_size}in
                </li>
              ) : null}
              {user.height_feet ? (
                <li
                  className='height'
                  id={user.id}
                  key={`height${userData.metrics.id}`}
                >
                  <strong>Height:</strong> {user.height_feet}'{' '}
                  {user.height_inches}"
                </li>
              ) : null}
              {user.weight_lbs ? (
                <li
                  className='weight'
                  id={user.id}
                  key={`weight${userData.metrics.id}`}
                >
                  <strong>Weight:</strong> {user.weight_lbs}lbs
                </li>
              ) : null}
              <li
                className='created'
                id={user.id}
                key={`created${userData.metrics.id}`}
              >
                <strong>Created:</strong>
                {created}
              </li>
            </ul>
            <button
              className='remove_metric'
              id={user.id}
              value={user.id}
              onClick={handleClick}
            >
              ❌
            </button>
          </div>
        </>
      );
    }
  });

  return (
    <div className='user_metrics'>
      <div id='member_name'>
        Member:{userData.first_name} {userData.last_name}
      </div>
      {removed ? (
        <div className='removed_metric_box'>
          Metric Removed! &nbsp;
          <button className='remove_metric' onClick={() => setRemoved(false)}>
            OK{' '}
          </button>
        </div>
      ) : (
        userMetrics
      )}
    </div>
  );
}

export default MembersPage;

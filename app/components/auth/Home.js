'use client'
import React from 'react';
import '../../globals.css'
import Image from 'next/image'
import rightIcon from '../../images/right1.svg'
import login from '../../images/login.jpeg'
import { HorizontalCard } from './HorizontalCard';
import dev from '../../images/dev.svg'
import user1 from '../../images/user1.svg'
import cases from '../../images/case.svg'
import { InputFormHead } from './InputFormHead';
import { InputForm } from './InputForm';

function Home() {
  return (
    <section className="vh-100" style={{ width: '98%' }}>
      <div className="row">
        <div id="img" className="imgss col-lg-5 d-flex align-items-center " style={{ backgroundColor: 'black', overflow: 'hidden', width: '40%' }}>
          <Image src={login}
            alt="Auth image" className="vh-100" style={{ objectFit: 'cover', objectPosition: 'left', opacity: '0.4' }} />
        </div>
        {/* <div className="col-sm-7 text-black">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <form style={{ width: '30rem' }}> */}
            <InputForm handleSubmit={{}}>
            <p style={{top:'-40px', left:'300px', position:'relative', color: '#8692A6', fontSize: '18px', fontWeight: '500', textAlign: 'end', paddingRight: '50px' }}>Already have an account? <a href="/login" className="text-decoration-none" style={{ color: '#007DFA', fontSize: '18px', fontWeight: '500' }}>Sign In</a></p>
              <InputFormHead title="Join Us!" details="TO bigin this journey, tell us what type of account you'd be opening." />
              <HorizontalCard title="Manager" description="Signup as a Manager to manage the task and bugs" redirect="/signup?user_type=manager" icon={user1} />
              <HorizontalCard title="Developer" description="Signup as a Developer to assign the relevent tasks to QA" redirect="/signup?user_type=developer" icon={cases} />
              <HorizontalCard title="QA" description="Signup as a QA to create the bugs and report in tasks" redirect="/signup?user_type=qa" icon={dev} />
              </InputForm>
            {/* </form>
          </div>
        </div> */}
      </div>
    </section>


  );
}

export default Home;




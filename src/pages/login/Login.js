import LoginPanel from '@/components/login/LoginPanel';
import React from 'react';
import auth from "@/components/firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { Skeleton } from 'antd';

const Login  = () => {
    const router = useRouter();
    const [user, loading, error] = useAuthState(auth);
    if (loading) {
        return (
          <div>
            <Skeleton />
          </div>
        )
      }
    if(user){
      router.push("/dashboard/InfoInput");
    }
    return (
        <div>
          <LoginPanel/>
        </div>
    );
};

export default Login ;

Login.getLayout = function (page) {
    return (
      <>
        {/* <Header /> */}
  
  
        <div className="site-layout-background">{page}</div>
        {/* <FooterLayout /> */}
        {/* <HomeMenu /> */}
      </>
    );
  };
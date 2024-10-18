'use client';

import { useState, createContext, Suspense } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';
import NavBar from '@/components/custom-ui/navbar/navbar';

export const Context = createContext({});

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    //   const [album_images, setAlbum_images] = useState<File[]>([]);
    //   const [album_title, setAlbum_title] = useState<string>();
    //   const [username, setUserName] = useState<string>("");
    //   const [userType, setUserType] = useState<string>("client"); //client or grapher
    //   const [feedbackStarCount, setFeedbackStarCount] = useState<number>(0);
    //   const [grapherEmail, setGrapherEmail] = useState();
    //   const [formData, setFormData] = useState({
    //     // first_name: '',
    //     // last_name: '',
    //     district: '',
    //     address: '',
    //     contact_01: '',
    //     contact_02: '',
    //     business_email: '',
    //     watsApp: '',
    //     fb_url: '',
    //     tiktok_url: '',
    //     insta_url: '',
    //     packages: []
    //   });
    //   const [grapherReviews, setGrapherReviews] = useState([{
    //     writer_email: '',
    //     writer_name: '',
    //     writer_img_url: '',
    //     star_count: '',
    //     review: '',
    //     date: '',
    //   }]);

    return (
        <SessionProvider>
            <NavBar />
            {children}
        </SessionProvider>
    );
}

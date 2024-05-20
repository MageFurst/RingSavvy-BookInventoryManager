"use client"
import Image from "next/image";
import * as backend from './backend.js';
import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';
import parse from "html-react-parser";
import $ from 'jquery';

async function handleClick() {

    var element = document.getElementById("isbn_entry")

    if(element.value.length === 10){
        if(element.value.length % 11 === 0){
            backend.createJSON(element.value)
            backend.getJSON();
        }
    }
    else if(element.value.length === 13){
        if(element.value.length % 10 === 0){
            backend.createJSON(element.value)
            backend.getJSON();
        }
    }
    else{
        element.setAttribute('type', 'text')
        element.setAttribute('placeholder', 'INVALID ISBN ENTERED.')
        element.setAttribute('readonly', '')
    }
}

async function handleDelete(){
    var element = document.getElementById("delete_entry")
    if(element.value.length > 0 && element.value.length < 4){
        backend.deleteJSON(element.value);
        backend.getJSON();
    }
}

export default function Home() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [jsonHTML, setjsonHTML] = useState(null);

         useEffect(() => {
            axios.get('/api/readJSON')
                .then((response1) => {
                    setData(response1.data);
                    setLoading(false);

                    axios.get('/api/displayJSON?q=' + JSON.stringify(response1.data))
                        .then((response2) => {
                            setjsonHTML(response2.data.html);
                            setLoading(false);
                        })
                        .catch((error) => {
                            setError(error);
                            setLoading(false);
                        });

                })
                .catch((error) => {
                    setError(error);
                    setLoading(false);
                });
        }, []);

    if (loading) {
        return <div className="items-center justify-center">Loading...</div>;
    }

    if (error) {
        return <div className="items-center justify-center">Error: {error.message}</div>;
    }

    return (

        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="flex flex-col items-center">
                <h1>Book Inventory Manager</h1>
                <div className="flex flex-wrap">
                    <div className="flex flex-col items-center mx-2">
                        Enter in the ISBN number for the book you'd like to add:
                        <form>
                            <input className="text-entry text-black" type="number" id="isbn_entry" name="isbn_entry"/>
                        </form>
                        <button class="my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" id="add-book-btn" onClick={handleClick}>Add New Book</button>
                    </div>
                    <div className="flex flex-col items-center mx-2">
                        Enter in entry (starting at 0) of book you'd like to remove:
                        <form>
                            <input className="text-entry text-black" type="number" id="delete_entry" name="delete_entry"/>
                        </form>
                        <button class="my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleDelete}>Delete Book At Entry</button>
                    </div>
                </div>
                {parse(JSON.stringify(jsonHTML, null, 2).slice(1, -1))}
            </div>
        </main>

    );
}

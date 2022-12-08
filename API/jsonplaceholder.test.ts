import superagent from "superagent";
import { expect } from "@jest/globals";
import { baseURL, name, numberOfPosts, numberOfUsers, postId, surname, userId } from "./utils/constants"

let response: any;

describe("HTTPS methods tests", () => {
    beforeEach(() => {
        response = null;
    })
        test("Should correctly read GET response", async () => {
          try {
        response = await superagent.get(`${baseURL}users`);
          } catch(err: any) {
            throw new Error(err.massage);
          };
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(10);
        });

        test("Should correctly read GET response with queries", async () => {
            try {
                response = await superagent.get(`${baseURL}posts`).query({ userId:`${userId}` });
            } catch(err: any) {
                throw new Error(err.massage);
              };
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(numberOfUsers);
        });

        test("Should correctly read POST response", async () => {
           try { response = await superagent.post(`${baseURL}posts`)
            .set("Content-Type", "application/json")
            .send({name, surname, userId});
        } catch(err: any) {
            throw new Error(err.massage);
        };
          expect(response.status).toBe(201);
          expect(response.body.name).toEqual(name);
          expect(response.body.surname).toEqual(surname);
          expect(response.body.userId).toEqual(userId);
          expect(response.body.id).toEqual(numberOfPosts + 1 );
        });

        test("Should correctly read PATCH response", async () => {
            try {response = await superagent.patch(`${baseURL}posts/${postId}`)
            .set("Content-Type", "application/json")
            .send({name});
        } catch(err: any) {
            throw new Error(err.massage);
          };
            expect(response.status).toBe(200);
            expect(response.body.name).toEqual(name);
        });

        test("Should correctly read PUT response", async () => {
           try { response = await superagent.put(`${baseURL}posts/${postId}`)
            .set("Content-Type", "application/json")
            .send({name, surname, userId}); 
        } catch(err: any) {
            throw new Error(err.massage);
        };
            expect(response.status).toBe(200);
            expect(response.body.id).toEqual(postId);
            expect(response.body.name).toEqual(name);
            expect(response.body.surname).toEqual(surname);
            expect(response.body.userId).toEqual(userId);
        });

        test("Should correctly read DELETE response", async () => {
            try { response = await superagent.delete(`${baseURL}posts/${postId}`);    
        } catch(err: any) {
            throw new Error(err.massage);
        };
            expect(response.status).toBe(200);
            expect(response.body).toEqual({});
        });
    
    });

    describe("HTTPS methods - negative tests", () => {
        beforeEach(() => {
            response = null;
        });

        test("Should correctly read GET response with 404 status code", async () => {
            try {
                response = await superagent.get(`${baseURL}posts/${numberOfPosts + 11}`);
            } catch(err: any) {
                expect(err.status).toBe(404);
                expect(err.response.text).toEqual('{}');
              };
        });

        test("Should correctly read POST response", async () => {
            try { response = await superagent.post(`${baseURL}/posts`)
             .set("Content-Type", "application/json")
             .send({name, surname, userId});
         } catch(err: any) {
            expect(err.status).toBe(404);
         };
         });

        test("Should correctly read PATCH response  with 404 status", async () => {
            try {response = await superagent.patch(`${baseURL}posts/${numberOfPosts + 11}`)
            .set("Content-Type", "application/json")
            .send({name});
        } catch(err: any) {
            expect(err.status).toBe(404);
        };
        });

        test("Should correctly read PUT response with 500 status", async () => {
           try { response = await superagent.put(`${baseURL}posts/${numberOfPosts + 11}`)
            .set("Content-Type", "application/json")
            .send({name, surname, userId}); 
        } catch(err: any) {
            expect(err.status).toBe(500);
        };
        });
    })


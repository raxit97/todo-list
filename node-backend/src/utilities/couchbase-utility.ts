import * as couchbase from 'couchbase';

export class CouchbaseUtility {

    private cluster: couchbase.Cluster;
    private static instance: CouchbaseUtility = null;
    private bucket: Map<string, couchbase.Bucket> = new Map<string, couchbase.Bucket>();
    private bucketName: string = 'react_todo';

    constructor() {
        this.cluster = new couchbase.Cluster('couchbase://localhost');
        this.cluster.authenticate('Administrator', 'rjain123');
    }

    public static getInstance() {
        if (this.instance === null) {
            this.instance = new CouchbaseUtility();
        }
        return this.instance;
    }

    public upsert(key: string, document: any) {
        return new Promise((resolve: any, reject: any) => {
            this.openBucket().upsert(key, document, function (error: any, result: any) {
                if (error) {
                    console.error(`Error during upsert operation for key ${key} ::: ${JSON.stringify(error)}`);
                    reject(error);
                } else {
                    resolve(true);
                }
            })
        });
    }

    public delete(key: string) {
        return new Promise((resolve: any, reject: any) => {
            this.openBucket().remove(key, function (error: any, result: any) {
                if (error) {
                    console.error(`Error during delete operation for key ${key} ::: ${JSON.stringify(error)}`);
                    reject(error);
                } else {
                    resolve(true);
                }
            })
        });
    }

    async getResultsBasedOnQuery(query: string, options?: any) {
        return new Promise((resolve: any, reject: any) => {
            if (options && options.length === 0) {
                options = [];
            }
            this.openBucket().query(couchbase.N1qlQuery.fromString(query), options, function(error: any, result: any) {
                if (error) {
                    console.error(`Error in executing query ::: ${error}`);
                    reject('error');
                }
                resolve(result);
            })
        });
    }

    private openBucket(): couchbase.Bucket {
        if (this.bucket.has(this.bucketName)) {
            return this.bucket.get(this.bucketName);
        } else {
            let bucket = this.cluster.openBucket(this.bucketName, function (error: any) {
                console.error(`Error opening bucket ::: ${JSON.stringify(error)}`)
            });
            bucket.operationTimeout = 50000 * 120;
            this.bucket.set(this.bucketName, bucket);
            return bucket;
        }
    }

}
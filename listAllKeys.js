const FS = require(`fs`)
const AWS = require('aws-sdk')
const request = require(`request`)
const mkdirp = require(`mkdirp`)
const PB = require(`progress`)
const {get} = require(`lodash`)
const Q = require('q');
const s3 = new AWS.S3();

const deferred = Q.defer();

let params = {
  Bucket: "openly-org-overview-api"
};

const allKeys = [];

async function listAllKeys(params) {
  const data = await s3
    .listObjectsV2(params)
    .promise();

  const contents = data.Contents;
  contents.forEach(function (content) {
    allKeys.push(content.Key);
  });

  if (data.IsTruncated) {
    params.ContinuationToken = data.NextContinuationToken;
    return await listAllKeys(params);
  }
  return
}

// async function getS3KeyContent(key, fileName) {   params.Key = key;   const
// data = await s3.getObject(params).promise();   if (!data) {     return
// undefined   }   data.   const contents = data.Body.toString('utf8');   return
// JSON.parse(contents); }

function downloadFile(filename) {
  params.Key = filename;
  const output = `./data/orgs/${filename}`;
  const stream = FS.createWriteStream(output);

  let bar;
  s3.getObject(params)
    .on('httpHeaders', function (statusCode, headers, resp) {
      var len = parseInt(headers['content-length'], 10);
      bar = new PB('  ' + filename + ': [:bar] :percent :etas', {
        complete: '=',
        incomplete: ' ',
        width: 20,
        total: len
      });
    })
    .on('httpData', function (chunk) {
      stream.write(chunk);
      bar.tick(chunk.length);
    })
    .on('httpDone', function (response) {
      if (response.error) {
        deferred.reject(response.error);
      } else {
        deferred.resolve(output);
      }
      stream.end();
    })
    .send();
  return deferred.promise;
}

const getOrgsFromS3 = async () => {
  const s3Data = await listAllKeys(params);
  allKeys.forEach(async function (s3Object) {
    const data = await downloadFile(s3Object);
  });
}

getOrgsFromS3();

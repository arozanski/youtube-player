import boto3
from io import BytesIO
import io
import zipfile
import mimetypes

def lambda_handler(event, context):

    s3 = boto3.resource('s3')
    sns = boto3.resource('sns')

    topic = sns.Topic('arn:aws:sns:eu-west-2:223963872767:DeployYoutubeTopic')
    youtube_bucket = s3.Bucket('youtube.rozanski.xyz')
    build_bucket = s3.Bucket('youtube-build.rozanski.xyz')

    youtube_zip = io.BytesIO()
    build_bucket.download_fileobj('youtubeplayer.zip', youtube_zip)

    with zipfile.ZipFile(youtube_zip) as myzip:
        for nm in myzip.namelist():
            obj = myzip.open(nm)
            youtube_bucket.upload_fileobj(obj, nm,
                ExtraArgs={'ContentType': mimetypes.guess_type(nm)[0]})
            youtube_bucket.Object(nm).Acl().put(ACL='public-read')
    print('All done')
    topic.publish(Subject='Youtube Player deployment complete', Message='Youtube Player deployment complete')

    return 'Lambda'

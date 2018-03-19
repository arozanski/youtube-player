import boto3
from io import BytesIO
import io
import zipfile

s3 = boto3.resource('s3')

youtube_bucket = s3.Bucket('youtube.rozanski.xyz')
build_bucket = s3.Bucket('youtube-build.rozanski.xyz')

youtube_zip = io.BytesIO()
build_bucket.download_fileobj('youtubeplayer.zip', youtube_zip)

with zipfile.ZipFile(youtube_zip) as myzip:
    for nm in myzip.namelist():
        obj = myzip.open(nm)
        youtube_bucket.upload_fileobj(obj, nm)
        youtube_bucket.Object(nm).Acl().put(ACL='public-read')

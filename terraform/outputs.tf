output "website_url" {
  description = "Website URL"
  value       = "http://${aws_s3_bucket_website_configuration.event_locator_website.website_endpoint}"
}

output "bucket_name" {
  description = "S3 bucket name"
  value       = aws_s3_bucket.event_locator_bucket.bucket
}
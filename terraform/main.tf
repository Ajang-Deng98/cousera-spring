terraform {
  cloud {
    organization = "event_locator"

    workspaces {
      name = "my-project-prod"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# S3 bucket for hosting static website
resource "aws_s3_bucket" "event_locator_bucket" {
  bucket = var.bucket_name
}

resource "aws_s3_bucket_website_configuration" "event_locator_website" {
  bucket = aws_s3_bucket.event_locator_bucket.id

  index_document {
    suffix = "index.html"
  }
}

resource "aws_s3_bucket_public_access_block" "event_locator_pab" {
  bucket = aws_s3_bucket.event_locator_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "event_locator_policy" {
  bucket = aws_s3_bucket.event_locator_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.event_locator_bucket.arn}/*"
      }
    ]
  })

  depends_on = [aws_s3_bucket_public_access_block.event_locator_pab]
}
resource "aws_iam_role" "iam_for_lambda_processa-politica" {
  name = "iam_for_lambdaprocessa-politica"

  
inline_policy {
    name = "apigateway-invoke-processa-politica-exec_policy"

    policy = jsonencode({
      Version = "2012-10-17"
      Statement = [
        {
          Action   = [ 
              "lambda:*",
              "log:*"
            ]
          Effect   = "Allow"
          Resource = "*"
        },
      ]
    })
  }

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}


data "archive_file" "lambda_processa-politica" {
  type        = "zip"
  source_dir  = "${path.module}/../app"
  output_path = "${path.module}/../lambda_function_processa-politica.zip"
}

resource "aws_lambda_function" "processa-politica" {
  # If the file is not in the current working directory you will need to include a
  # path.module in the filename.
  filename      = "${path.module}/../lambda_function_processa-politica.zip"
  function_name = "lambda_function_processa-politica"
  role          = aws_iam_role.iam_for_lambda_processa-politica.arn
  handler       = "_lambda_handler.handler"

  source_code_hash = data.archive_file.lambda_processa-politica.output_base64sha256

  runtime = "nodejs18.x"

  depends_on = [
    data.archive_file.lambda_processa-politica
  ]

  environment {
    variables = {
      foo = "bar"
    }
  }
}

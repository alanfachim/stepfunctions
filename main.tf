# Configurar o provedor AWS
provider "aws" {
  region = "us-east-1"
}

# Criar um papel IAM para o stepfunctions
resource "aws_iam_role" "stepfunctions_role" {
  name = "stepfunctions-role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "states.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}
 

# Criar um stepfunctions
resource "aws_sfn_state_machine" "stepfunctions" {
  name     = "alcada"
  role_arn = aws_iam_role.stepfunctions_role.arn

  # Carregar o definition de um arquivo externo chamado definition.json
  definition = file(var.file)
}
 

module "processa-politica" {
  source = "./processa-politica/infra"
}
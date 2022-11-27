resource "aws_vpc" "main_vpc" {
  cidr_block           = "10.123.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "todo"
  }
}

resource "aws_subnet" "main_public_subnet" {
  vpc_id                  = aws_vpc.main_vpc.id
  cidr_block              = "10.123.1.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "ap-southeast-1a"
  tags = {
    Name = "todo-public"
  }
}

resource "aws_internet_gateway" "main_internet_gateway" {
  vpc_id = aws_vpc.main_vpc.id
  tags = {
    Name = "todo-internet-gateway"
  }
}

resource "aws_route_table" "main_public_route_table" {
  vpc_id = aws_vpc.main_vpc.id
  tags = {
    Name = "todo-public-route-table"
  }
}
resource "aws_route" "main_default_route" {
  route_table_id         = aws_route_table.main_public_route_table.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.main_internet_gateway.id
}
resource "aws_route_table_association" "main_public_association" {
  subnet_id      = aws_subnet.main_public_subnet.id
  route_table_id = aws_route_table.main_public_route_table.id
}

resource "aws_security_group" "main_security_group" {
  name        = "todo_security_group"
  description = "for todo"
  vpc_id      = aws_vpc.main_vpc.id

  ingress = [{
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
    prefix_list_ids  = ["0.0.0.0/0"]
    security_groups  = []
    self             = true
    description      = "todo_security_group_ingress"
  }]

  egress = [{
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
    prefix_list_ids  = ["0.0.0.0/0"]
    security_groups  = []
    self             = true
    description      = "todo_security_group_ingress"
  }]

  tags = {
    Name = "todo_security_group"
  }
}

resource "aws_key_pair" "todo_auth" {
  key_name   = "todo_auth"
  public_key = file("${var.HOME}/${var.public_key_file}")
}

resource "aws_instance" "todo_api_node" {
  instance_type          = "t2.micro"
  ami                    = data.aws_ami.todo_ami.id
  key_name               = aws_key_pair.todo_auth.key_name
  vpc_security_group_ids = [aws_security_group.main_security_group.id]
  subnet_id              = aws_subnet.main_public_subnet.id
  user_data              = file("./templates/userdata.tpl")
  root_block_device {
    volume_size = 10
  }

  tags = {
    Name = "todo_api_node"
  }
  provisioner "local-exec" {
    command=templatefile("./templates/ssh-config.tpl", {
      host="todo",
      hostname=self.public_ip,
      user="ubuntu",
      identityFile="${var.HOME}/${var.public_key_file}",
    })
  }
}

# terraform {
#   required_providers {
#     docker = {
#       source  = "kreuzwerker/docker"
#       version = "~>2.23.0"
#     }
#   }
# }

# provider "docker" {}

# resource "docker_image" "node" {
#   name         = "node"
#   keep_locally = true
#   build {
#     path = "."
#     tag  = ["todo:dev"]
#   }
# }

# resource "docker_image" "postgres" {
#   name         = "postgres"
#   keep_locally = true
# }

# resource "docker_container" "todo_pg" {
#   image   = docker_image.postgres.image_id
#   name    = "todo_pg"
#   env     = ["POSTGRES_HOST=postgres", "POSTGRES_PORT=5432", "POSTGRES_USER=postgres", "POSTGRES_PASSWORD=12345678", "POSTGRES_DB=to_do", "POSTGRES_HOST_AUTH_METHOD=password"]
#   restart = "always"
#   host {
#     host = "postgres"
#     ip   = "127.0.0.1"
#   }
#   ports {
#     internal = 5432
#     external = 5433
#   }
# }

# resource "docker_container" "todo_api" {
#   image = "todo:dev"
#   name  = "todo_api"
#   host {
#     host = "todo"
#     ip   = "127.0.0.1"
#   }
#   ports {
#     internal = 3000
#     external = 3030
#   }
# }

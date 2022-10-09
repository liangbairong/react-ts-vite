# This file is a template, and might need editing before it works on your project.
# This Dockerfile installs a compiled binary into a bare system.
# You must either commit your compiled binary into source control (not recommended)
# or build the binary first as part of a CI/CD pipeline.

FROM harbor.elelive.cn/showme-web/nginx-jo
WORKDIR /usr/share/nginx/html
ADD /artifact/ .
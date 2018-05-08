FROM 933480341162.dkr.ecr.us-west-2.amazonaws.com/node:9.2.0

WORKDIR /code
ADD .. /code
RUN npm --silent install --production

ENTRYPOINT ["/bin/bash"]
CMD ["-l"]
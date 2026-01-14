ARG REPO=node
ARG IMAGE=21-alpine
FROM $REPO:$IMAGE

RUN apk --no-cache update \
    && apk --no-cache add bash tzdata git \
    && rm -rf /var/cache/apk/*

RUN npm i jiralog -g

ARG GIT_USER="Software Engineer"
ARG GIT_EMAIL="<user@andersen.dev>"
ARG USER_NAME=jiracli
ARG USER_ID=1000
ARG UMASK=0022
ARG TZ=Asia/Tbilisi
ENV TZ=${TZ}

RUN echo "umask ${UMASK}" >> /etc/bash/bashrc
RUN cp /usr/share/zoneinfo/${TZ} /etc/localtime \
    && echo ${TZ} > /etc/timezone

RUN deluser node
RUN adduser -D -h "/home/${USER_NAME}" -u ${USER_ID} -g ${USER_NAME} ${USER_NAME}
USER ${USER_NAME}
WORKDIR /home/${USER_NAME}

RUN git config --global user.email "${GIT_EMAIL}"
RUN git config --global user.name "${GIT_USER}"

ENTRYPOINT ["/bin/bash"]

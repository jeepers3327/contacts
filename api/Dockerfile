FROM elixir:1.12.1-alpine AS dev

WORKDIR /app
ADD . /app/

RUN mix local.hex --force && \ 
    mix local.rebar --force

RUN mix deps.get && \
    mix deps.compile

CMD ["mix", "phx.server"]


FROM elixir:1.12.1-alpine AS build

RUN apk add --no-cache build-base git

RUN mkdir /app
WORKDIR /app

RUN mix local.hex --force && \
    mix local.rebar --force

ENV MIX_ENV=prod

COPY mix.exs mix.lock ./
RUN mix deps.get

COPY config ./config
RUN mix deps.compile

COPY lib ./lib/
COPY priv ./priv/

RUN mix compile
RUN mix release

FROM alpine:3.14.0 AS prod

RUN apk upgrade --no-cache && \ 
    apk add --no-cache postgresql-client bash openssl libgcc libstdc++ ncurses-libs && \
    rm -rf /var/cache/apk/*

RUN mkdir /app
WORKDIR /app

RUN chown nobody:nobody /app
USER nobody:nobody

COPY --from=build --chown=nobody:nobody /app/_build/prod/rel/api ./
COPY entrypoint.sh .

EXPOSE 4000

ENTRYPOINT ["sh", "./entrypoint.sh"]
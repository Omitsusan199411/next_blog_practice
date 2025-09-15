#!/bin/bash

yarn prisma generate

yarn prisma migrate dev

exec yarn run dev

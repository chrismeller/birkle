# Hi There :wave:, I'm your friendly neighborhood Birkle TimeTrackr
You know it's cool, because it's missing vowels...

## The Unboxing
Isn't unboxing a new toy the best part? You carefully open your shiny new TimeTrackr and find inside:
- Typescript
- NestJS
- Prisma ORM
- SQLite
- JWT

## Turning It On
Ordinarily of course no one reads the documentation, but this brand new TimeTrackr has so many buttons you'll just take a quick peak to figure out how to turn it on...

### The Power
You check the bottom of the device and see that it was designed in Estonia, so it prefers the local **Node 15** current to run optimally.

### The Configuration
The manual says an example configuration is included, but it will require adjustment before the device runs properly. They refer you to appendix A for this `template.env` and tell you that after making your adjustments it should be saved as `development.env` before moving on.

### The Parts
What?? Some assembly required? Seems a bit Swedish, but ok. The manual says that before you turn it on, you need to attach approximately 701 different, sometimes miniscule, parts. Fortunately, they've included a specialized tool that makes this a breeze. For some reason you can't fathom, they've named this step `npm install --include=dev`.

### The Primer
Once you've got all the parts attached properly, the manual says you need to prime what looks like some kind of storage device before the first use. In the box you find another tool that looks vaguely like a prism. Attaching it to the port labelled `npx prisma migrate dev --preview-feature` on the outside of the device, it emits a pleasing ding when completed that makes you think about microwavable burritos. Yummy.

### Powering Up
Finally, the moment has arrived! The manual indicates an obscure command for starting the device. You blindly enter it on the console and hit enter: `npm run start:dev`

Several green lines seem to indicate the device has powered on successfully. The manual says to reference appendix B for a list of availble commands, also known as a Postman collection stored in `postman.json`.

## Quick and Easy
After reading the entire manual, you find that the last page contains a few simple lines that would have handled all of that setup for you... Stupid documentation authors!
```
npm install --include=dev
cp template.env development.env
npx prisma migrate dev --preview-feature
npm run start:dev
```

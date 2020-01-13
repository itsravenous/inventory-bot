# inventory-bot
Automated inventory for Slack RPG games

## Usage
1. Create a Google spreadsheet with tabs named for each player's username (*not* name or display name - each player can find it at https://<your_workspace_name>.slack.com/account/settings#username, or alternatively they can see it in the heading of the response from the `/inventory` command which this app supplies
2. Create a column in each player's tab for each receptacle, e.g. `Backpack`, `Small pouch`, `Bag of holding`, etc
2. Publish it (File > Publish to the Web)
3. Deploy the lambda function (either via AWS or Netlify cloud functions)
4. Add a Slack app with a slash command (call it something like `/inventory`) pointing at your deployed lambda's URL
5. Players can now use `/inventory` to get their inventory. Updates to the Google spreadsheet will be reflected when they next use the command

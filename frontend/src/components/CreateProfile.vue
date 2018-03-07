<template>
    <div class="container" style="width: 100%;">
        <div class="row">
            <div class="col-xs-12 nav-home text-center">
                <a class="top-level-link" href="http://legion.maskedarmory.com">Create Profile</a>
                <a class="top-level-link" href="mailto:shane@khaccounts.net?subject=Bug Report">Bug Report</a>
            </div>
        </div>
    </div>

    <div class="container-home">
        <div class="row">
            <div class="col-md-12">
                <div class="logo">
                    <img src="../assets/images/logo.png" alt="Logo" />
                </div>
            </div>
        </div>

        <div class="row row-bottom-pad">
            <div class="col-md-12">
                <div class="profile-creation-box">
                    <div class="box-padding">
                        <span class="news">UPDATE :: Masked Armory - Legion Edition - launched officially May 1, 2017.  All existing profiles on the old Masked Armory will still work, but new profile creation will only be allowed on this website.  Hope you all like the changes!</span><br/><br/>
                        <strong>Masked Armory</strong> is the most well known anonymous World of Warcraft (WoW) profile source in the Real Money Trading (RMT) market.  We hide your character and server name so that you can be protected when you are attempting to buy, sell, or trade a WoW account!  Come create your Masked Armory profile today in just a matter of seconds!
                    </div>
                </div>
            </div>
        </div>

        <div if.bind="armoryError" class="row row-bottom-pad">
            <div class="col-md-12">
                <div class="error-box">
                    <div class="error-box-padding">
                        <div if.bind="armoryError == 'region'">
                            Please choose a region.
                        </div>
                        <div if.bind="armoryError == 'server'">
                            Please enter in your server name.
                        </div>
                        <div if.bind="armoryError == 'character'">
                            Please enter in your character name.
                        </div>
                        <div if.bind="armoryError == 'armoryCreateFailed'">
                            There was an error creating your profile.  This is due to a issue with the Battle.net API.
                            Please try again in 10-15 minutes.
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12 container-bottom-pad">
                <div class="profile-creation-box">
                    <div class="box-padding">
                        <form class="form-horizontal" role="form" submit.delegate="submit()">
                            <div class="form-group">
                                <label class="col-sm-3 control-label">Region</label>
                                <div class="col-sm-9">
                                    <label class="radio-inline">
                                        <input type="radio" name="region_name" value="us" checked.bind="postData.region"> United States
                                    </label>
                                    <label class="radio-inline">
                                        <input type="radio" name="region_name" value="eu" checked.bind="postData.region"> Europe
                                    </label>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="server_name" class="col-sm-3 control-label">Server</label>
                                <div class="col-sm-9">
                                    <input class="form-control" style="width: 270px;" list="serverList" id="server_name" name="server_name" placeholder="Server Name" />
                                    <datalist id="serverList">
                                        <option>Aegwynn</option>

                                    </datalist>

                                </div>
                            </div>
                            <div class="form-group">
                                <label for="character_name" class="col-sm-3 control-label">Character</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control" id="character_name" name="character_name" placeholder="Character Name" value.bind="postData.characterName" />
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-offset-3 col-sm-9">
                                    <button type="submit" class="btn create-profile-button" id="create_profile">Create Armory Profile</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container" style="width: 100%;">
        <div class="row">
            <div class="col-xs-12 nav-footer-index text-center">
                <span style="padding-right: 15px;"><a class="top-level-link" href="https://www.khaccounts.net/">Buy Sell WoW Accounts</a></span>
                <span style="padding-right: 15px;"><a class="top-level-link" href="https://www.khaccounts.net/buy-wow-accounts">Buy High End Elite Premium WoW Accounts</a></span>
                <span><a class="top-level-link" href="https://www.khaccounts.net/sell-wow-accounts">Sell High End Elite Premium WoW Accounts</a></span>

            </div>
        </div>
    </div>
</template>
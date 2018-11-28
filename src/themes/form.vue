<div class="columns is-fullheight">
	<?php include('sidebar.php') ?>

	<div class="column is-main-content">

		<nav class="breadcrumb" aria-label="breadcrumbs">
			<ul>
				<li><a href="#">Bulma</a></li>
				<li><a href="#">Documentation</a></li>
				<li><a href="#">Components</a></li>
				<li class="is-active"><a href="#" aria-current="page">Breadcrumb</a></li>
			</ul>
		</nav>

		<div class="tabs">
			<ul>
				<li class="is-active"><a>Pictures</a></li>
				<li><a>Music</a></li>
				<li><a>Videos</a></li>
				<li><a>Documents</a></li>
			</ul>
		</div>

		<div class="columns is-spaced">
			<div class="column is-3">
				<div class="card">
			<div class="card-image">
				<figure class="image is-4by3">
					<img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
				</figure>
			</div>
			<div class="card-content">
				<div class="media">
					<div class="media-left">
						<figure class="image is-48x48">
							<img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
						</figure>
					</div>
					<div class="media-content">
						<p class="title is-4">John Smith</p>
						<p class="subtitle is-6">@johnsmith</p>
					</div>
				</div>
				<div class="content">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Phasellus nec iaculis mauris. <a>@bulmaio</a>.
					<a href="#">#css</a> <a href="#">#responsive</a>
					<br>
					<time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
				</div>
			</div>
		</div>
			</div>
		</div>

		<h1 class="title">Table</h1>
		<h2 class="subtitle">The inevitable HTML table, with special case cells</h2>

		<table class="table">
			<thead>
				<tr>
					<th><abbr title="Position">Pos</abbr></th>
					<th>Team</th>
					<th><abbr title="Played">Pld</abbr></th>
					<th><abbr title="Won">W</abbr></th>
					<th><abbr title="Drawn">D</abbr></th>
					<th><abbr title="Lost">L</abbr></th>
					<th><abbr title="Goals for">GF</abbr></th>
					<th><abbr title="Goals against">GA</abbr></th>
					<th><abbr title="Goal difference">GD</abbr></th>
					<th><abbr title="Points">Pts</abbr></th>
					<th>Qualification or relegation</th>
				</tr>
			</thead>
			<tfoot>
			<tr>
				<th><abbr title="Position">Pos</abbr></th>
				<th>Team</th>
				<th><abbr title="Played">Pld</abbr></th>
				<th><abbr title="Won">W</abbr></th>
				<th><abbr title="Drawn">D</abbr></th>
				<th><abbr title="Lost">L</abbr></th>
				<th><abbr title="Goals for">GF</abbr></th>
				<th><abbr title="Goals against">GA</abbr></th>
				<th><abbr title="Goal difference">GD</abbr></th>
				<th><abbr title="Points">Pts</abbr></th>
				<th>Qualification or relegation</th>
			</tr>
			</tfoot>
			<tbody>
				<tr>
					<th>1</th>
					<td><a href="https://en.wikipedia.org/wiki/Leicester_City_F.C." title="Leicester City F.C.">Leicester City</a> <strong>(C)</strong>
				</td>
				<td>38</td>
				<td>23</td>
				<td>12</td>
				<td>3</td>
				<td>68</td>
				<td>36</td>
				<td>+32</td>
				<td>81</td>
				<td>Qualification for the <a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_League#Group_stage" title="2016–17 UEFA Champions League">Champions League group stage</a></td>
			</tr>
			<tr>
				<th>2</th>
				<td><a href="https://en.wikipedia.org/wiki/Arsenal_F.C." title="Arsenal F.C.">Arsenal</a></td>
				<td>38</td>
				<td>20</td>
				<td>11</td>
				<td>7</td>
				<td>65</td>
				<td>36</td>
				<td>+29</td>
				<td>71</td>
				<td>Qualification for the <a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_League#Group_stage" title="2016–17 UEFA Champions League">Champions League group stage</a></td>
			</tr>
			<tr>
				<th>3</th>
				<td><a href="https://en.wikipedia.org/wiki/Tottenham_Hotspur_F.C." title="Tottenham Hotspur F.C.">Tottenham Hotspur</a></td>
				<td>38</td>
				<td>19</td>
				<td>13</td>
				<td>6</td>
				<td>69</td>
				<td>35</td>
				<td>+34</td>
				<td>70</td>
				<td>Qualification for the <a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_League#Group_stage" title="2016–17 UEFA Champions League">Champions League group stage</a></td>
			</tr>
			<tr class="is-selected">
				<th>4</th>
				<td><a href="https://en.wikipedia.org/wiki/Manchester_City_F.C." title="Manchester City F.C.">Manchester City</a></td>
				<td>38</td>
				<td>19</td>
				<td>9</td>
				<td>10</td>
				<td>71</td>
				<td>41</td>
				<td>+30</td>
				<td>66</td>
				<td>Qualification for the <a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_League#Play-off_round" title="2016–17 UEFA Champions League">Champions League play-off round</a></td>
			</tr>
			<tr>
				<th>5</th>
				<td><a href="https://en.wikipedia.org/wiki/Manchester_United_F.C." title="Manchester United F.C.">Manchester United</a></td>
				<td>38</td>
				<td>19</td>
				<td>9</td>
				<td>10</td>
				<td>49</td>
				<td>35</td>
				<td>+14</td>
				<td>66</td>
				<td>Qualification for the <a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Europa_League#Group_stage" title="2016–17 UEFA Europa League">Europa League group stage</a></td>
			</tr>
			<tr>
				<th>6</th>
				<td><a href="https://en.wikipedia.org/wiki/Southampton_F.C." title="Southampton F.C.">Southampton</a></td>
				<td>38</td>
				<td>18</td>
				<td>9</td>
				<td>11</td>
				<td>59</td>
				<td>41</td>
				<td>+18</td>
				<td>63</td>
				<td>Qualification for the <a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Europa_League#Group_stage" title="2016–17 UEFA Europa League">Europa League group stage</a></td>
			</tr>
			<tr>
				<th>7</th>
				<td><a href="https://en.wikipedia.org/wiki/West_Ham_United_F.C." title="West Ham United F.C.">West Ham United</a></td>
				<td>38</td>
				<td>16</td>
				<td>14</td>
				<td>8</td>
				<td>65</td>
				<td>51</td>
				<td>+14</td>
				<td>62</td>
				<td>Qualification for the <a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Europa_League#Third_qualifying_round" title="2016–17 UEFA Europa League">Europa League third qualifying round</a></td>
			</tr>
			<tr>
				<th>8</th>
				<td><a href="https://en.wikipedia.org/wiki/Liverpool_F.C." title="Liverpool F.C.">Liverpool</a></td>
				<td>38</td>
				<td>16</td>
				<td>12</td>
				<td>10</td>
				<td>63</td>
				<td>50</td>
				<td>+13</td>
				<td>60</td>
				<td></td>
			</tr>
			<tr>
				<th>9</th>
				<td><a href="https://en.wikipedia.org/wiki/Stoke_City_F.C." title="Stoke City F.C.">Stoke City</a></td>
				<td>38</td>
				<td>14</td>
				<td>9</td>
				<td>15</td>
				<td>41</td>
				<td>55</td>
				<td>−14</td>
				<td>51</td>
				<td></td>
			</tr>
			<tr>
				<th>10</th>
				<td><a href="https://en.wikipedia.org/wiki/Chelsea_F.C." title="Chelsea F.C.">Chelsea</a></td>
				<td>38</td>
				<td>12</td>
				<td>14</td>
				<td>12</td>
				<td>59</td>
				<td>53</td>
				<td>+6</td>
				<td>50</td>
				<td></td>
			</tr>
			<tr>
				<th>11</th>
				<td><a href="https://en.wikipedia.org/wiki/Everton_F.C." title="Everton F.C.">Everton</a></td>
				<td>38</td>
				<td>11</td>
				<td>14</td>
				<td>13</td>
				<td>59</td>
				<td>55</td>
				<td>+4</td>
				<td>47</td>
				<td></td>
			</tr>
			<tr>
				<th>12</th>
				<td><a href="https://en.wikipedia.org/wiki/Swansea_City_A.F.C." title="Swansea City A.F.C.">Swansea City</a></td>
				<td>38</td>
				<td>12</td>
				<td>11</td>
				<td>15</td>
				<td>42</td>
				<td>52</td>
				<td>−10</td>
				<td>47</td>
				<td></td>
			</tr>
			<tr>
				<th>13</th>
				<td><a href="https://en.wikipedia.org/wiki/Watford_F.C." title="Watford F.C.">Watford</a></td>
				<td>38</td>
				<td>12</td>
				<td>9</td>
				<td>17</td>
				<td>40</td>
				<td>50</td>
				<td>−10</td>
				<td>45</td>
				<td></td>
			</tr>
			<tr>
				<th>14</th>
				<td><a href="https://en.wikipedia.org/wiki/West_Bromwich_Albion_F.C." title="West Bromwich Albion F.C.">West Bromwich Albion</a></td>
				<td>38</td>
				<td>10</td>
				<td>13</td>
				<td>15</td>
				<td>34</td>
				<td>48</td>
				<td>−14</td>
				<td>43</td>
				<td></td>
			</tr>
			<tr>
				<th>15</th>
				<td><a href="https://en.wikipedia.org/wiki/Crystal_Palace_F.C." title="Crystal Palace F.C.">Crystal Palace</a></td>
				<td>38</td>
				<td>11</td>
				<td>9</td>
				<td>18</td>
				<td>39</td>
				<td>51</td>
				<td>−12</td>
				<td>42</td>
				<td></td>
			</tr>
			<tr>
				<th>16</th>
				<td><a href="https://en.wikipedia.org/wiki/A.F.C._Bournemouth" title="A.F.C. Bournemouth">AFC Bournemouth</a></td>
				<td>38</td>
				<td>11</td>
				<td>9</td>
				<td>18</td>
				<td>45</td>
				<td>67</td>
				<td>−22</td>
				<td>42</td>
				<td></td>
			</tr>
			<tr>
				<th>17</th>
				<td><a href="https://en.wikipedia.org/wiki/Sunderland_A.F.C." title="Sunderland A.F.C.">Sunderland</a></td>
				<td>38</td>
				<td>9</td>
				<td>12</td>
				<td>17</td>
				<td>48</td>
				<td>62</td>
				<td>−14</td>
				<td>39</td>
				<td></td>
			</tr>
			<tr>
				<th>18</th>
				<td><a href="https://en.wikipedia.org/wiki/Newcastle_United_F.C." title="Newcastle United F.C.">Newcastle United</a> <strong>(R)</strong>
			</td>
			<td>38</td>
			<td>9</td>
			<td>10</td>
			<td>19</td>
			<td>44</td>
			<td>65</td>
			<td>−21</td>
			<td>37</td>
			<td>Relegation to the <a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_Football_League_Championship" title="2016–17 Football League Championship">Football League Championship</a></td>
		</tr>
		<tr>
			<th>19</th>
			<td><a href="https://en.wikipedia.org/wiki/Norwich_City_F.C." title="Norwich City F.C.">Norwich City</a> <strong>(R)</strong>
		</td>
		<td>38</td>
		<td>9</td>
		<td>7</td>
		<td>22</td>
		<td>39</td>
		<td>67</td>
		<td>−28</td>
		<td>34</td>
		<td>Relegation to the <a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_Football_League_Championship" title="2016–17 Football League Championship">Football League Championship</a></td>    </tr>
		<tr>
			<th>20</th>
			<td><a href="https://en.wikipedia.org/wiki/Aston_Villa_F.C." title="Aston Villa F.C.">Aston Villa</a> <strong>(R)</strong>
		</td>
		<td>38</td>
		<td>3</td>
		<td>8</td>
		<td>27</td>
		<td>27</td>
		<td>76</td>
		<td>−49</td>
		<td>17</td>
		<td>Relegation to the <a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_Football_League_Championship" title="2016–17 Football League Championship">Football League Championship</a></td>
		</tr>
		</tbody>
		</table>

		<h1 class="title">Progress Bar</h1>
		<h2 class="subtitle">Native HTML progress bars</h2>

		<progress class="progress is-small is-primary" value="15" max="100">15%</progress>
		<progress class="progress is-small is-link" value="30" max="100">30%</progress>
		<progress class="progress is-small is-info" value="45" max="100">45%</progress>
		<progress class="progress is-small is-success" value="60" max="100">60%</progress>
		<progress class="progress is-small is-warning" value="75" max="100">75%</progress>
		<progress class="progress is-small is-danger" value="90" max="100">90%</progress>

		<h1 class="title">Notification</h1>
		<h2 class="subtitle">Bold notification blocks, to alert your users of something</h2>

		<div class="notification is-primary">
			<button class="delete"></button>
			Primar lorem ipsum dolor sit amet, consectetur
			adipiscing elit lorem ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Sit amet,
			consectetur adipiscing elit
		</div>
		<div class="notification is-link">
			<button class="delete"></button>
			Primar lorem ipsum dolor sit amet, consectetur
			adipiscing elit lorem ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Sit amet,
			consectetur adipiscing elit
		</div>
		<div class="notification is-info">
			<button class="delete"></button>
			Primar lorem ipsum dolor sit amet, consectetur
			adipiscing elit lorem ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Sit amet,
			consectetur adipiscing elit
		</div>
		<div class="notification is-success">
			<button class="delete"></button>
			Primar lorem ipsum dolor sit amet, consectetur
			adipiscing elit lorem ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Sit amet,
			consectetur adipiscing elit
		</div>
		<div class="notification is-warning">
			<button class="delete"></button>
			Primar lorem ipsum dolor sit amet, consectetur
			adipiscing elit lorem ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Sit amet,
			consectetur adipiscing elit
		</div>
		<div class="notification is-danger">
			<button class="delete"></button>
			Primar lorem ipsum dolor sit amet, consectetur
			adipiscing elit lorem ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Sit amet,
			consectetur adipiscing elit
		</div>

		<h1 class="title">Delete</h1>
		<h2 class="subtitle">A versatile delete cross</h2>

		<div class="block">
			<span class="tag is-success">
				Hello World
				<button class="delete is-small"></button>
			</span>
		</div>
		<div class="notification is-danger">
			<button class="delete"></button>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor sit amet, consectetur adipiscing elit
		</div>
		<article class="message is-info">
			<div class="message-header">
				Info
				<button class="delete"></button>
			</div>
			<div class="message-body">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque risus mi, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum felis venenatis efficitur. Aenean ac eleifend lacus, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.
			</div>
		</article>

		<h1 class="title">Box</h1>
		<h2 class="subtitle">A white box to contain other elements</h2>

		<div class="box">
			<article class="media">
				<div class="media-left">
					<figure class="image is-64x64">
						<img src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
					</figure>
				</div>
				<div class="media-content">
					<div class="content">
						<p>
							<strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
							<br>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.
						</p>
					</div>
					<nav class="level is-mobile">
						<div class="level-left">
							<a class="level-item" aria-label="reply">
								<span class="icon is-small">
									<i class="fas fa-reply" aria-hidden="true"></i>
								</span>
							</a>
							<a class="level-item" aria-label="retweet">
								<span class="icon is-small">
									<i class="fas fa-retweet" aria-hidden="true"></i>
								</span>
							</a>
							<a class="level-item" aria-label="like">
								<span class="icon is-small">
									<i class="fas fa-heart" aria-hidden="true"></i>
								</span>
							</a>
						</div>
					</nav>
				</div>
			</article>
		</div>
		<!-- END box -->

		<h1 class="title">Form Elements</h1>
		<h2 class="subtitle">The indispensable form controls, designed for maximum clarity.</h2>

		<div class="box">
			<div class="field">
				<label class="label">Name</label>
				<div class="control">
					<input class="input" type="text" placeholder="Text input">
				</div>
			</div>

		<div class="field">
			<p class="control has-icons-left">
				<span class="select">
					<select>
						<option selected>Country</option>
						<option>Select dropdown</option>
						<option>With options</option>
					</select>
				</span>
				<span class="icon is-small is-left">
					<i data-feather="user"></i>
				</span>
			</p>
		</div>

			<div class="field">
				<label class="label">Username</label>
				<div class="control has-icons-left has-icons-right">
					<input class="input is-success" type="text" placeholder="Text input" value="bulma">
					<span class="icon is-small is-left">
						<i data-feather="user"></i>
					</span>
					<span class="icon is-small is-right">
						<i data-feather="chevron-up"></i>
					</span>
				</div>
				<p class="help is-success">This username is available</p>
			</div>
			<div class="field">
				<label class="label">Email</label>
				<div class="control has-icons-left has-icons-right">
					<input class="input is-danger" type="email" placeholder="Email input" value="hello@">
					<span class="icon is-small is-left">
						<i data-feather="mail"></i>
					</span>
					<span class="icon is-small is-right">
						<i class="fas fa-exclamation-triangle"></i>
					</span>
				</div>
				<p class="help is-danger">This email is invalid</p>
			</div>
			<div class="field">
				<label class="label">Subject</label>
				<div class="control">
					<div class="select is-fullwidth">
						<select>
							<option>Select dropdown</option>
							<option>With options</option>
						</select>
					</div>
				</div>
			</div>
			<div class="field">
				<label class="label">Message</label>
				<div class="control">
					<textarea class="textarea" placeholder="Textarea"></textarea>
				</div>
			</div>

			<div class="field">
				<div class="control">
					
					<div class="checkbox">
						<label>
							<input type="checkbox" value="">
							<span>I agree to the <a href="#">terms and conditions</a></span>
						</label>
					</div>
				</div>
				<!-- END control -->
			</div>
			<!-- END field -->

			<div class="field">
				<div class="control">
					<label class="label" for="exampleInputEmail1">Input Checkbox</label>

					<!-- Default checkbox -->
					<div class="checkbox">
						<label>
							<input type="checkbox" value="">
							<span>Option 1</span>
						</label>
					</div>
					
					<!-- Default checkbox -->
					<div class="checkbox">
						<label>
							<input type="checkbox" value="">
							<span>Option 2</span>
						</label>
					</div>
					
					<!-- Default checkbox -->
					<div class="checkbox">
						<label>
							<input type="checkbox" value="">
							<span>Option 3</span>
						</label>
					</div>

					<label for="exampleInputEmail1">Checked</label>

					<!-- Checked checkbox -->
					<div class="checkbox">
						<label>
							<input type="checkbox" checked>
							<span>Option 4 is checked by default</span>
						</label>
					</div>

					
					<label for="exampleInputEmail1">Disabled</label>
					<!-- Disabled checkbox -->
					<div class="checkbox disabled">
						<label>
							<input type="checkbox" value="" disabled>
							<span>Option 5 is disabled</span>
						</label>
					</div>

					<label class="label" for="exampleInputEmail1">Radio</label>

					<div class="radio">
						<label>
							<input type="radio" name="radio">
							<span>Option 1</span>
						</label>
					</div>
					<!-- END radio -->

					<div class="radio">
						<label>
							<input type="radio" name="radio">
							<span>Option 2</span>
						</label>
					</div>
					<!-- END radio -->

					<div class="radio">
						<label>
							<input type="radio" name="radio" disabled>
							<span>Option Disabled</span>
						</label>
					</div>
					<!-- END radio -->

					<div class="radio">
						<label>
							<input type="radio" name="radio">
							<span>Option 3</span>
						</label>
					</div>
					<!-- END radio -->
				</div>
				<!-- END control -->
			</div>
			<!-- END field -->

			<div class="field is-grouped">
				<div class="control">
					<button class="button is-link">Submit</button>
				</div>
				<div class="control">
					<button class="button is-text">Cancel</button>
				</div>
			</div>
		</div>
		<!-- END box -->

		<footer class="footer">
			<div class="content has-text-centered">
				<p>
					<strong>AMP</strong> by <a href="http://felixaya.la">ZeroKB</a>. The source code is licensed
					<a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
					is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
				</p>
			</div>
		</footer>
		<!-- END footer -->
	</div>
	<!-- END column -->
</div>
<!-- END columns -->